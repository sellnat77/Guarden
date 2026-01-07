from db import database

async def get_plants_for_location(root):
    from core_schema import Plant
    query = "SELECT * FROM plant WHERE \"locationId\" = :id"
    plants = await database.fetch_all(query, {"id": str(root.id)})
    if plants:
        return [Plant(**dict(plant)) for plant in plants]

async def get_user_for_location(root):
    from core_schema import User
    return await User.get_by_id(root.createdById)
