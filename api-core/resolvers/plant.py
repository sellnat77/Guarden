from db import database

async def get_all_plants():
    from Types.Plant.type import Plant
    query = "SELECT * FROM plant"
    plants = await database.fetch_all(query)
    return [Plant(**dict(plant)) for plant in plants]

async def get_location_for_plant(root):
    from core_schema import Location
    return await Location.get_by_id(root.locationId)


async def get_user_for_plant(root):
    from core_schema import User
    return await User.get_by_id(root.createdById)
