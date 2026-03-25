from datetime import datetime
from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from sqlalchemy.orm import Query

from app.database.models import TipModel
from app.graphql.core.filters import FilterField, FilterSet, Op, apply_filters
from app.graphql.core.input_base import BaseInput

if TYPE_CHECKING:
    from app.graphql.schema import Plant, Tip


@strawberry.input
class AddTipInput(BaseInput):
    tipText: str

    def __init__(self):
        self.model_class = TipModel


@strawberry.type
class TipMutations:
    @strawberry.mutation
    async def addTip(self, info: strawberry.Info, input: AddTipInput) -> None:
        db: async_sessionmaker = info.context["db"]

        async with db() as session:
            newTip = input.to_model()
            session.add(newTip)
            await session.commit()


class TipFilterSet(FilterSet):
    id = FilterField(TipModel.id, op=Op.eq)


TipFilterInput = TipFilterSet.input_type()


@strawberry.type
class TipQueries:

    @strawberry.field
    async def getTips(
        self,
        info: strawberry.Info,
        filters: Optional[TipFilterInput] = strawberry.UNSET,
        limit: int | None = None,
        offset: int = 0,
    ) -> List[Annotated["Tip", strawberry.lazy("app.graphql.schema")]]:
        db: async_sessionmaker = info.context["db"]

        async with db() as session:
            query = apply_filters(Query(TipModel), filters)
            tips = await session.execute(query.offset(offset).limit(limit))
            return list(tips.scalars())
