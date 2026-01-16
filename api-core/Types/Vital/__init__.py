from strawberry.dataloader import DataLoader

from .loader import load_vitals

loader = DataLoader(load_fn=load_vitals)
