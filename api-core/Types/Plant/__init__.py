from strawberry.dataloader import DataLoader

from .loader import load_plants

loader = DataLoader(load_fn=load_plants)
