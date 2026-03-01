import strawberry
from strawberry.dataloader import DataLoader

from db import Plant, SessionLocal

# from .loader import load_plants
from .inputs import *

# loader = DataLoader(load_fn=load_plants)


@strawberry.type
class PlantMutations:
    @strawberry.mutation
    async def addPlant(self, input: AddPlantInput) -> None:
        with SessionLocal() as sess:
            newPlant = Plant(**input.__dict__)
            sess.add(newPlant)
            sess.commit()

    @strawberry.mutation
    async def deletePlant(self, input: DeletePlantInput) -> None:
        with SessionLocal() as sess:
            id_to_delete = input.id
            print(id_to_delete)
            print(input)
            sess.query(Plant).filter_by(id=id_to_delete).delete()
            sess.commit()
