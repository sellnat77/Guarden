from datetime import datetime
from typing import TYPE_CHECKING, Annotated, Any, List, Optional

import strawberry

from app.database.db import SessionLocal
from app.database.models import PlantModel
from app.graphql.core.filters import FilterField, FilterSet, Op, apply_filters
from app.graphql.core.input_base import BaseInput

if TYPE_CHECKING:
    from app.graphql.schema import Plant


@strawberry.input
class AddPlantInput(BaseInput):
    name: str
    species: str
    image: str
    generalHealth: str
    description: str
    waterFrequencyDays: int
    fertilizeFrequencyDays: int
    pruneFrequencyDays: int
    repotFrequencyDays: int
    lastWatered: datetime
    lastPruned: datetime
    lastFertilized: datetime
    lastRepotted: datetime
    locationId: int
    createdById: int
    model_class = PlantModel


@strawberry.input
class DeletePlantInput:
    id: int


@strawberry.type
class PlantMutations:
    @strawberry.mutation
    async def addPlant(self, info: strawberry.Info, input: AddPlantInput) -> None:
        session = info.context["db"]
        newPlant = input.to_model()
        session.add(newPlant)
        session.commit()

    @strawberry.mutation
    async def deletePlant(self, info: strawberry.Info, input: DeletePlantInput) -> None:
        session = info.context["db"]
        id_to_delete = input.id
        session.query(PlantModel).filter_by(id=id_to_delete).delete()
        session.commit()


class PlantFilterSet(FilterSet):
    created_by = FilterField(PlantModel.createdById, op=Op.eq)


PlantFilterInput = PlantFilterSet.input_type()


@strawberry.type
class PlantQueries:
    @strawberry.field
    async def getPlants(
        self,
        info: strawberry.Info,
        filters: Optional[PlantFilterInput] = strawberry.UNSET,
        limit: int | None = None,
        offset: int = 0,
    ) -> List[Annotated["Plant", strawberry.lazy("app.graphql.schema")]]:
        session = info.context["db"]
        query = apply_filters(session.query(PlantModel), filters)
        plants = query.offset(offset).limit(limit).all()
        return list(plants)
