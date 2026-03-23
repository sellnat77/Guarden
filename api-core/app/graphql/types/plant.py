from datetime import datetime
from typing import TYPE_CHECKING, Annotated, Any, List, Optional

import strawberry
from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Query

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
        session: AsyncSession = info.context["db"]
        newPlant = input.to_model()
        session.add(newPlant)
        await session.commit()

    @strawberry.mutation
    async def deletePlant(self, info: strawberry.Info, input: DeletePlantInput) -> None:
        session: AsyncSession = info.context["db"]
        id_to_delete = input.id
        await session.execute(delete(PlantModel).where(PlantModel.id == id_to_delete))
        await session.commit()


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
        session: AsyncSession = info.context["db"]
        query = apply_filters(Query(PlantModel), filters)
        plants = await session.execute(query.offset(offset).limit(limit))
        return list(plants.scalars())
