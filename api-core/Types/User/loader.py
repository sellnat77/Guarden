from strawberry.dataloader import DataLoader
from typing import List
from .type import User
from db import database


async def load_users(keys: List[int]) -> List[User]:
    query = "SELECT * FROM users WHERE id in (:keys)"
    users = await database.fetch_all(query, {"keys": ','.join([str(key) for key in keys])})
    return [User(**dict(user)) for user in users]
