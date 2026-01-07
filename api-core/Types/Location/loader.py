from typing import List
from .type import Location
from db import database


async def load_locations(keys: List[int]) -> List[Location]:
    query = "SELECT * FROM location WHERE id in (:keys)"
    locations = await database.fetch_all(query, {"keys": ','.join([str(key) for key in keys])})
    return [Location(**dict(location)) for location in locations]
