from typing import List

from strawberry.dataloader import DataLoader

from db import database

from .type import Vital


async def load_vitals(keys: List[int]) -> List[Vital]:
    query = "SELECT * FROM vitals WHERE plantId in (:keys)"
    vitals = await database.fetch_all(
        query, {"keys": ",".join([str(key) for key in keys])}
    )
    return [Vital(**dict(vital)) for vital in vitals]
