from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.orm import Query

from app.database.models import LocationModel
from app.graphql.core.filters import FilterField, FilterSet, Op, apply_filters
from app.graphql.core.input_base import BaseInput

if TYPE_CHECKING:
    from app.graphql.schema import Location, Plant


@strawberry.input
class AddLocationInput(BaseInput):
    name: str
    userId: int
    model_class = LocationModel


@strawberry.type
class LocationMutations:
    @strawberry.mutation
    async def addLocation(self, info: strawberry.Info, input: AddLocationInput) -> None:
        db: async_sessionmaker = info.context["db"]

        async with db() as session:
            newLocation = input.to_model()
            session.add(newLocation)
            await session.commit()


class LocationFilterSet(FilterSet):
    id = FilterField(LocationModel.id, op=Op.eq)
    nameIsNull = FilterField(LocationModel.name, op=Op.is_null)
    created_by = FilterField(LocationModel.userId, op=Op.eq)


LocationFilterInput = LocationFilterSet.input_type()


@strawberry.type
class LocationQueries:

    @strawberry.field
    async def getLocations(
        self,
        info: strawberry.Info,
        filters: Optional[LocationFilterInput] = strawberry.UNSET,
        limit: int | None = None,
        offset: int = 0,
    ) -> List[Annotated["Location", strawberry.lazy("app.graphql.schema")]]:
        db: async_sessionmaker = info.context["db"]
        async with db() as session:
            query = apply_filters(Query(LocationModel), filters)
            locations = await session.execute(query.offset(offset).limit(limit))
            return list(locations.scalars())
