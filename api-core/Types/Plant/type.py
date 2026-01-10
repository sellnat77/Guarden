from datetime import datetime
from typing import TYPE_CHECKING, Annotated

import strawberry

from .resolvers import get_location_for_plant, get_user_for_plant

if TYPE_CHECKING:
    from Types.Location.type import Location
    from Types.User.type import User


@strawberry.type
class Plant:
    id: str
    name: str
    species: str
    lastWatered: datetime
    lastPruned: datetime
    lastFertilized: datetime
    lastRePotted: datetime
    notes: str
    locationId: str
    createdById: str
    location: Annotated["Location", strawberry.lazy("Types.Location.type")] | None = (
        strawberry.field(resolver=get_location_for_plant)
    )
    createdBy: Annotated["User", strawberry.lazy("Types.User.type")] | None = (
        strawberry.field(resolver=get_user_for_plant)
    )
