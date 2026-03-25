"""
filters.py — Generic filtering pipeline for Strawberry GraphQL + SQLAlchemy

Usage:
    1. Subclass `FilterSet` for your model
    2. Declare typed fields with `FilterField(...)` descriptors
    3. Use `FilterSet.input_type()` in your resolver signature
    4. Pass an instance to `apply_filters(query, filters)`

Supports: eq, neq, lt, lte, gt, gte, like, ilike, in_, is_null
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Any, Optional

import strawberry
from sqlalchemy.orm import Query

# ---------------------------------------------------------------------------
# Supported operators
# ---------------------------------------------------------------------------


class Op(str, Enum):
    eq = "eq"
    neq = "neq"
    lt = "lt"
    lte = "lte"
    gt = "gt"
    gte = "gte"
    like = "like"
    ilike = "ilike"
    in_ = "in_"
    is_null = "is_null"


# ---------------------------------------------------------------------------
# FilterField descriptor
# ---------------------------------------------------------------------------


@dataclass
class FilterField:
    """
    Args:
        column:  SQLAlchemy column, e.g. BookModel.title
        op:      Operator from Op enum (default: eq)
    """

    column: Any
    op: Op = Op.eq


# ---------------------------------------------------------------------------
# FilterSet base — InputType is built lazily on first access
# ---------------------------------------------------------------------------


class FilterSetMeta(type):
    def __new__(mcs, name, bases, namespace):
        filter_fields: dict[str, FilterField] = {}

        for attr, value in namespace.items():
            if isinstance(value, FilterField):
                filter_fields[attr] = value

        # Inherit parent fields
        for base in bases:
            for k, v in getattr(base, "_filter_fields", {}).items():
                if k not in filter_fields:
                    filter_fields[k] = v

        namespace["_filter_fields"] = filter_fields
        namespace["_input_type_cache"] = None  # populated lazily
        return super().__new__(mcs, name, bases, namespace)


class FilterSet(metaclass=FilterSetMeta):
    """
    Base class for all filter sets.

    Example:
        class BookFilterSet(FilterSet):
            title_contains = FilterField(BookModel.title,  op=Op.ilike)
            min_rating     = FilterField(BookModel.rating, op=Op.gte)
            genre_in       = FilterField(BookModel.genre,  op=Op.in_)

    Use in a resolver:
        filters: Optional[BookFilterSet.input_type()] = strawberry.UNSET
    """

    _filter_fields: dict[str, FilterField] = {}
    _input_type_cache = None

    @classmethod
    def input_type(cls):
        """
        Returns the auto-generated @strawberry.input class for this FilterSet.
        Built once on first call, then cached — safe to call at import time
        or inside a resolver annotation.
        """
        if cls._input_type_cache is None:
            cls._input_type_cache = _build_input_type(cls.__name__, cls._filter_fields)
        return cls._input_type_cache


# ---------------------------------------------------------------------------
# Input type builder (called lazily)
# ---------------------------------------------------------------------------


def _build_input_type(name: str, filter_fields: dict[str, FilterField]):
    """Dynamically construct a @strawberry.input dataclass."""
    annotations = {}
    defaults = {}

    for field_name, ff in filter_fields.items():
        if ff.op == Op.in_:
            py_type = _sa_type_to_python(col_type)
            annotations[field_name] = Optional[list[py_type]]
        elif ff.op == Op.is_null:
            annotations[field_name] = Optional[bool]
        else:
            col_type = ff.column.property.columns[0].type
            py_type = _sa_type_to_python(col_type)
            annotations[field_name] = Optional[py_type]

        defaults[field_name] = strawberry.UNSET

    input_cls = type(
        f"{name}Input",
        (),
        {"__annotations__": annotations, **defaults},
    )
    return strawberry.input(input_cls)


# ---------------------------------------------------------------------------
# apply_filters
# ---------------------------------------------------------------------------


def apply_filters(query: Query, input_instance) -> Query:
    """
    Apply a FilterSet input instance to a SQLAlchemy query.
    Skips any field that is UNSET or None.
    """
    if input_instance is None or input_instance is strawberry.UNSET:
        return query

    # Resolve which FilterSet owns this input type
    input_type = type(input_instance)
    filterset_cls = _find_filterset_for(input_type)
    if filterset_cls is None:
        raise TypeError(f"No FilterSet found for input type {input_type!r}")

    for field_name, ff in filterset_cls._filter_fields.items():
        value = getattr(input_instance, field_name, strawberry.UNSET)
        if value is strawberry.UNSET or value is None:
            continue

        col = ff.column
        op = ff.op

        if op == Op.eq:
            query = query.filter(col == value)
        elif op == Op.neq:
            query = query.filter(col != value)
        elif op == Op.lt:
            query = query.filter(col < value)
        elif op == Op.lte:
            query = query.filter(col <= value)
        elif op == Op.gt:
            query = query.filter(col > value)
        elif op == Op.gte:
            query = query.filter(col >= value)
        elif op == Op.like:
            query = query.filter(col.like(f"%{value}%"))
        elif op == Op.ilike:
            query = query.filter(col.ilike(f"%{value}%"))
        elif op == Op.in_:
            query = query.filter(col.in_(value))
        elif op == Op.is_null:
            query = query.filter(col.is_(None) if value else col.isnot(None))

    return query


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _find_filterset_for(input_type: type) -> type | None:
    """Walk all FilterSet subclasses to find the one whose cache matches."""

    def _walk(cls):
        for sub in cls.__subclasses__():
            if sub._input_type_cache is input_type:
                return sub
            found = _walk(sub)
            if found:
                return found
        return None

    return _walk(FilterSet)


def _sa_type_to_python(sa_type) -> type:
    from datetime import date, datetime

    from sqlalchemy import Boolean, Date, DateTime, Float, Integer, String

    for sa_cls, py_cls in [
        (Integer, int),
        (Float, float),
        (String, str),
        (Boolean, bool),
        (DateTime, datetime),
        (Date, date),
    ]:
        if isinstance(sa_type, sa_cls):
            return py_cls
    return str
