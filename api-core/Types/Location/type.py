from typing import Annotated

import strawberry
from typing_extensions import TYPE_CHECKING

from Types.Location.resolvers import (get_plants_for_location,
                                      get_user_for_location)

if TYPE_CHECKING:
    from Types.Plant.type import Plant
    from Types.User.type import User


@strawberry.type
class Location:
    id: str
    name: str
    description: str
    parentId: str
    createdById: str
    plants: list[Annotated["Plant", strawberry.lazy("Types.Plant.type")]] | None = (
        strawberry.field(resolver=get_plants_for_location)
    )
    createdBy: Annotated["User", strawberry.lazy("Types.User.type")] | None = (
        strawberry.field(resolver=get_user_for_location)
    )
