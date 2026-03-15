from typing import TYPE_CHECKING, Annotated

import strawberry

from .Login import LoginMutation
from .Register import RegisterMutation
from .util import get_current_user

if TYPE_CHECKING:
    from core_schema import User


@strawberry.type
class AuthMutations:
    @strawberry.field
    async def login(self) -> LoginMutation:
        return LoginMutation()

    @strawberry.field
    async def register(self) -> RegisterMutation:
        return RegisterMutation()


@strawberry.type
class AuthQueries:
    @strawberry.field
    async def get_verified_user_by_token(
        self, token: str
    ) -> Annotated["User", strawberry.lazy("core_schema")]:
        return await get_current_user(token)
