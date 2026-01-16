from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, Annotated, List

import strawberry

import db

from .resolvers import get_location_for_plant, get_user_for_plant

if TYPE_CHECKING:
    from Types.Location.type import Location
    from Types.User.type import User
    from Types.Vital.type import Vital


class GeneralHealth(Enum):
    HEALTHY = "Healthy"
    NEEDS_ATTENTION = "Needs Attention"
    CRITICAL = "Critical"


# @StarSqlMapp.type(db.Plant)
# class Plant:
#     pass

# @strawberry.type
# class Plant:
#     id: str
#     name: str
#     species: str
#     image: str
#     generalHealth: GeneralHealth
#     notes: str
#     waterFrequencyDays: int
#     fertilizeFrequencyDays: int
#     pruneFrequencyDays: int
#     repotFrequencyDays: int
#     lastWatered: datetime
#     lastPruned: datetime
#     lastFertilized: datetime
#     lastRePotted: datetime
#     locationId: str
#     createdById: str
#     location: Annotated["Location", strawberry.lazy("Types.Location.type")] | None = (
#         strawberry.field(resolver=get_location_for_plant)
#     )
#     createdBy: Annotated["User", strawberry.lazy("Types.User.type")] | None = (
#         strawberry.field(resolver=get_user_for_plant)
#     )
#     vitals: List[Annotated["Vital", strawberry.lazy("Types.Vital.type")]]
