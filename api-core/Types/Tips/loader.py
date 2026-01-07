from strawberry.dataloader import DataLoader
from typing import List
from .type import Tip
from db import database


async def load_tips(keys: List[int]) -> List[Tip]:
    query = "SELECT * FROM tips WHERE id in (:keys)"
    tips = await database.fetch_all(query, {"keys": ','.join([str(key) for key in keys])})
    return [Tip(**dict(tip)) for tip in tips]
