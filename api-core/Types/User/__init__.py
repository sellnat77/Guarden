from strawberry.dataloader import DataLoader
from .loader import load_users

loader = DataLoader(load_fn=load_users)
