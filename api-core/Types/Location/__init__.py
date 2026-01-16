from db import SessionLocal, Location
from sqlalchemy import insert, Table, MetaData
import strawberry
from strawberry.dataloader import DataLoader

from .loader import load_locations
from .inputs import *

loader = DataLoader(load_fn=load_locations)


@strawberry.type
class LocationMutations:
    @strawberry.mutation
    async def addLocation(self, input: AddLocationInput) ->  None:
        with SessionLocal() as sess:
            statement = insert(Location).values(name=input.name)
            print(statement)
            sess.execute(statement)
            sess.commit()
