from typing import List

from strawberry.dataloader import DataLoader

from db import database

from .type import User


async def load_users(keys: List[int]) -> List[User]:
    query = "SELECT * FROM users WHERE id in (:keys)"
    users = await database.fetch_all(
        query, {"keys": ",".join([str(key) for key in keys])}
    )
    return [User(**dict(user)) for user in users]
