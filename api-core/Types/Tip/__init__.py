from typing import TYPE_CHECKING

import strawberry
from sqlalchemy import MetaData, Table, insert
from strawberry.dataloader import DataLoader

from db import SessionLocal, Tip, database

from .inputs import *


@strawberry.type
class TipMutations:
    @strawberry.mutation
    async def addTip(self, input: AddTipInput) -> None:
        with SessionLocal() as sess:
            newTip = Tip(**input.__dict__)
            sess.add(newTip)
