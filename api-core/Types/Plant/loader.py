from typing import List

from strawberry.dataloader import DataLoader

from db import database

# from .type import Plant


# async def load_plants(keys: List[int]) -> List[Plant]:
#     query = "SELECT * FROM plant WHERE id in (:keys)"
#     plants = await database.fetch_all(
#         query, {"keys": ",".join([str(key) for key in keys])}
#     )
#     return [Plant(**dict(plant)) for plant in plants]
