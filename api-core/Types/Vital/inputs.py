from datetime import datetime

import strawberry


@strawberry.input
class AddVitalInput:
    healthPct: int
    notes: str
    image: str
    plantId: int
    date: datetime
