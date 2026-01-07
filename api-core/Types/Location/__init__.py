from strawberry.dataloader import DataLoader
from .loader import load_locations

loader = DataLoader(load_fn=load_locations)
