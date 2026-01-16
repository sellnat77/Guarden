from datetime import datetime
from typing import TYPE_CHECKING

import strawberry
from sqlalchemy.util.typing import Annotated

if TYPE_CHECKING:
    from Types.Plant.type import Plant


@strawberry.type
class Vital:
    id: str
    healthPct: int
    created: datetime = datetime.now()
    plantId: str
    plant: Annotated["Plant", "Types.Plant.type"]
