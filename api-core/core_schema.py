from typing import List
from asyncpg import Record
from datetime import datetime

import strawberry

from db import database
from Types.Plant.type import Plant
from Types.Location.type import Location
from Types.User.type import User
from Types.Tips.type import Tip
from resolvers import plant as plantResolver
from resolvers import location as locationResolver
from Types.Plant import loader as PlantLoader
from Types.Location import loader as LocationLoader
from Types.User import loader as UserLoader
from Types.Tips import loader as TipLoader
from Types.Tips import TipMutations

@strawberry.type
class GetAllPlantsReturn:
    plants: List[Plant]
    count: int

@strawberry.type
class Query:
    @strawberry.field
    async def plant(self, id: str) -> 'Plant | None':
        return await PlantLoader.load(id)

    @strawberry.field
    async def getAllPlants(self)-> GetAllPlantsReturn:
        plants = await plantResolver.get_all_plants()
        return GetAllPlantsReturn(plants=plants, count=len(plants))


    @strawberry.field
    async def location(self, id: str) -> 'Location | None':
        return await LocationLoader.load(id)

    @strawberry.field
    async def user(self, id: str) -> 'User | None':
        return await UserLoader.load(id)

    @strawberry.field
    async def tip(self, id: str) -> 'Tip | None':
        return await TipLoader.load(id)

@strawberry.type
class Mutation:
    @strawberry.field
    def tip(self) -> TipMutations:
        return TipMutations()


schema = strawberry.Schema(query=Query, mutation=Mutation, types=[Plant, Location, User, Tip])
