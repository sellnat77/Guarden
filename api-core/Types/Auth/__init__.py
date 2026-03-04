import strawberry

from .Login import LoginMutation
from .Register import RegisterMutation


@strawberry.type
class AuthMutations:
    @strawberry.field
    async def login(self) -> LoginMutation:
        return LoginMutation()

    @strawberry.field
    async def register(self) -> RegisterMutation:
        return RegisterMutation()
