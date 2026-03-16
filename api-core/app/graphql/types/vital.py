from datetime import datetime
from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry

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
        session = info.context["db"]
        newVital = input.to_model()
        session.add(newVital)
        session.commit()


class VitalFilterSet(FilterSet):
    healtPctEqual = FilterField(VitalModel.healthPct, op=Op.eq)
    healtPctOver = FilterField(VitalModel.healthPct, op=Op.gte)
    healtPctUnder = FilterField(VitalModel.healthPct, op=Op.lte)
    plantId = FilterField(VitalModel.plantId, op=Op.eq)


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
        session = info.context["db"]
        query = apply_filters(session.query(VitalModel), filters)
        Vitals = query.offset(offset).limit(limit).all()
        return list(Vitals)
