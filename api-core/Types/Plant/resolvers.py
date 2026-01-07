from typing import TYPE_CHECKING
from Types.Location import loader as LocationLoader
from Types.User import loader as UserLoader


async def get_location_for_plant(root):
    return await LocationLoader.load(root.locationId)


async def get_user_for_plant(root):
    return await UserLoader.load(root.createdById)
