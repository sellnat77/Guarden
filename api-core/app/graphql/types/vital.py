from datetime import datetime
from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.orm import Query

from app.database.models import VitalModel
from app.graphql.core.filters import FilterField, FilterSet, Op, apply_filters
from app.graphql.core.input_base import BaseInput

if TYPE_CHECKING:
    from app.graphql.schema import Plant, Vital


@strawberry.input
class AddVitalInput(BaseInput):
    healthPct: int
    notes: str
    image: str
    plantId: int
    date: datetime
    model_class = VitalModel


@strawberry.type
class VitalMutations:
    @strawberry.mutation
    async def addVital(self, info: strawberry.Info, input: AddVitalInput) -> None:
        db: async_sessionmaker = info.context["db"]

        async with db() as session:
            newVital = input.to_model()
            session.add(newVital)
            await session.commit()


class VitalFilterSet(FilterSet):
    healtPctEqual = FilterField(VitalModel.healthPct, op=Op.eq)
    healtPctOver = FilterField(VitalModel.healthPct, op=Op.gte)
    healtPctUnder = FilterField(VitalModel.healthPct, op=Op.lte)
    plantId = FilterField(VitalModel.plantId, op=Op.eq)
    plantIdIn = FilterField(VitalModel.plantId, op=Op.in_)


VitalFilterInput = VitalFilterSet.input_type()


@strawberry.type
class VitalQueries:

    @strawberry.field
    async def getVitals(
        self,
        info: strawberry.Info,
        filters: Optional[VitalFilterInput] = strawberry.UNSET,
        limit: int | None = None,
        offset: int = 0,
    ) -> List[Annotated["Vital", strawberry.lazy("app.graphql.schema")]]:
        db: async_sessionmaker = info.context["db"]

        async with db() as session:
            query = apply_filters(Query(VitalModel), filters)
            vitals = await session.execute(
                query.order_by(VitalModel.date.asc()).offset(offset).limit(limit)
            )
            return list(vitals.scalars())
