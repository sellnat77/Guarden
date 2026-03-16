from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Query

from app.database.models import LocationModel
from app.graphql.core.filters import FilterField, FilterSet, Op, apply_filters
from app.graphql.core.input_base import BaseInput

if TYPE_CHECKING:
    from app.graphql.schema import Location, Plant


@strawberry.input
class AddLocationInput(BaseInput):
    name: str
    model_class = LocationModel


@strawberry.type
class LocationMutations:
    @strawberry.mutation
    async def addLocation(self, info: strawberry.Info, input: AddLocationInput) -> None:
        session: AsyncSession = info.context["db"]
        newLocation = input.to_model()
        session.add(newLocation)
        await session.commit()


class LocationFilterSet(FilterSet):
    id = FilterField(LocationModel.id, op=Op.eq)
    nameIsNull = FilterField(LocationModel.name, op=Op.is_null)


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
        session: AsyncSession = info.context["db"]
        print(session)
        query = apply_filters(Query(LocationModel), filters)
        locations = await session.execute(query.offset(offset).limit(limit))
        return list(locations.scalars())
