from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry

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
        session = info.context["db"]
        newLocation = input.to_model()
        session.add(newLocation)
        session.commit()


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
        session = info.context["db"]
        query = apply_filters(session.query(LocationModel), filters)
        locations = query.offset(offset).limit(limit).all()
        return list(locations)
