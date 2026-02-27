import strawberry
from strawberry.dataloader import DataLoader

from db import SessionLocal, Vital

from .inputs import *
from .loader import load_vitals

loader = DataLoader(load_fn=load_vitals)


@strawberry.type
class VitalMutations:
    @strawberry.mutation
    async def addVital(self, input: AddVitalInput) -> None:
        with SessionLocal() as sess:
            newVital = Vital(**input.__dict__)
            sess.add(newVital)
            sess.commit()
