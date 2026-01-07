from typing import TYPE_CHECKING
from Types.Location import loader as LocationLoader
from Types.User import loader as UserLoader
from db import database

async def get_all_plants():
    from .type import Plant
    query = "SELECT COUNT(*) FROM plant"
    plants = await database.fetch_all(query)
    return [Plant(**dict(plant)) for plant in plants]

async def get_location_for_plant(root):
    return await LocationLoader.load(root.locationId)


async def get_user_for_plant(root):
    return await UserLoader.load(root.createdById)
