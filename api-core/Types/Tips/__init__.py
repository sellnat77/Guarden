from typing import TYPE_CHECKING

import strawberry
from sqlalchemy import MetaData, Table, insert
from strawberry.dataloader import DataLoader

from db import database
from Types.Tips.type import Tip

from .inputs import *
from .loader import load_tips

loader = DataLoader(load_fn=load_tips)


@strawberry.type
class TipMutations:
    @strawberry.mutation
    async def addTip(self, input: AddTipInput) -> Tip | None:
        newTip = Tip(tip=input.tip_text)
        print(newTip)
        statement = insert(Table("tips", MetaData())).values(input)
        print(statement)
        await database.execute(statement)
        return newTip
