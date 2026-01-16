from datetime import datetime
import strawberry


@strawberry.input
class AddPlantInput:
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
