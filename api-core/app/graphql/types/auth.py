from typing import TYPE_CHECKING, Annotated, Union

import strawberry
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.models import UserModel
from app.graphql.core.auth_util import (
    ACCESS_TOKEN_NAME,
    authenticate_user,
    create_access_token,
    create_user,
    get_current_user,
)
from app.graphql.core.input_base import BaseInput

if TYPE_CHECKING:
    from app.graphql.schema import User


@strawberry.type
class LoginSuccess:
    user: Annotated["User", strawberry.lazy("app.graphql.schema")]
    token: str


@strawberry.type
class LoginError:
    message: str


LoginResult = Annotated[
    Union[LoginSuccess, LoginError], strawberry.union("LoginResult")
]


@strawberry.type
class LoginMutation:
    @strawberry.mutation
    async def loginUser(
        self, info: strawberry.Info, username: str, password: str
    ) -> LoginResult:
        session: AsyncSession = info.context["db"]
        authenticatedUser = await authenticate_user(username, password, session)
        if authenticatedUser:
            access_token = create_access_token({"sub": authenticatedUser.username})
            info.context["response"].set_cookie(
                key=ACCESS_TOKEN_NAME, value=access_token
            )
            return LoginSuccess(user=authenticatedUser, token=access_token)

        return LoginError(message="Login Failed")


@strawberry.input
class RegisterUserInput(BaseInput):
    username: str
    email: str
    password: str
    profilePicture: str
    model_class = UserModel


@strawberry.type
class RegisterSuccess:
    user: Annotated["User", strawberry.lazy("app.graphql.schema")]
    token: str


@strawberry.type
class RegisterError:
    message: str


RegisterResult = Annotated[
    Union[RegisterSuccess, RegisterError], strawberry.union("RegisterResult")
]


@strawberry.type
class RegisterMutation:
    @strawberry.mutation
    async def registerUser(
        self, info: strawberry.Info, userInput: RegisterUserInput
    ) -> RegisterResult:
        session: AsyncSession = info.context["db"]
        authenticatedUser = await create_user(
            session=session, user=userInput.to_model()
        )
        if authenticatedUser:
            access_token = create_access_token({"sub": authenticatedUser.username})
            info.context["response"].set_cookie(
                key=ACCESS_TOKEN_NAME, value=access_token
            )
            return RegisterSuccess(user=authenticatedUser, token=access_token)

        return RegisterError(message="Registration Failed")


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
        self, info: strawberry.Info, token: str
    ) -> Annotated["User", strawberry.lazy("app.graphql.schema")]:
        session: AsyncSession = info.context["db"]
        return await get_current_user(session, token)
