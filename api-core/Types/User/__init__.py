from db import SessionLocal, User
import strawberry
from strawberry.dataloader import DataLoader

from .inputs import *
# from .loader import load_users

# loader = DataLoader(load_fn=load_users)


@strawberry.type
class UserMutations:
    @strawberry.mutation
    async def addUser(self, input: AddUserInput) -> None:
        with SessionLocal() as sess:
            newUser = User(**input.__dict__)
            sess.add(newUser)
            sess.commit()
