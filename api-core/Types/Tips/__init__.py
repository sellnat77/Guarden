from sqlalchemy import insert, Table, MetaData
from db import database
from typing import TYPE_CHECKING
import strawberry
from strawberry.dataloader import DataLoader
from .loader import load_tips
from .inputs import *
from Types.Tips.type import Tip


loader = DataLoader(load_fn=load_tips)


@strawberry.type
class TipMutations:
    @strawberry.mutation
    async def addTip(self, input: AddTipInput) -> Tip | None:
        newTip = Tip(tip=input.tip_text)
        print(newTip)
        statement = insert(Table('tips', MetaData())).values(input)
        print(statement)
        await database.execute(statement)
        return newTip
