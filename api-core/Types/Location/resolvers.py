from typing import TYPE_CHECKING

from db import database
from Types.User import loader as UserLoader


async def get_plants_for_location(root):
    pass
    # from Types.Plant.type import Plant
    # query = "SELECT * FROM plant WHERE \"locationId\" = :id"
    # plants = await database.fetch_all(query, {"id": str(root.id)})
    # if plants:
    #     return [Plant(**dict(plant)) for plant in plants]


async def get_user_for_location(root):
    return await UserLoader.load(root.createdById)
