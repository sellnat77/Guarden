import strawberry
from sqlalchemy import MetaData, Table, insert
from strawberry.dataloader import DataLoader

from db import Location, SessionLocal

from .inputs import *
from .loader import load_locations

loader = DataLoader(load_fn=load_locations)


@strawberry.type
class LocationMutations:
    @strawberry.mutation
    async def addLocation(self, input: AddLocationInput) -> None:
        with SessionLocal() as sess:
            newLocation = Location(**input.__dict__)
            sess.add(newLocation)
            sess.commit()
