from typing import Generic, Type, TypeVar

import strawberry

T = TypeVar("T")


class BaseInput(Generic[T]):
    model_class: Type[T]

    def to_model(self) -> T:
        return self.model_class(**strawberry.asdict(self))
