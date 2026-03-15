import token
from typing import TYPE_CHECKING, Annotated, Union

import strawberry
from botocore.vendored.six import u

from . import util

if TYPE_CHECKING:
    from core_schema import User


@strawberry.input
class RegisterUserInput:
    username: str
    email: str
    password: str
    profilePicture: str

@strawberry.type
class RegisterSuccess:
    user: Annotated["User", strawberry.lazy("core_schema")]
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
    def registerUser(
        self, userInput: RegisterUserInput, info
    ) -> RegisterResult:
        authenticatedUser = util.create_user(**userInput.__dict__)
        if authenticatedUser:
            access_token = util.create_access_token({"sub": authenticatedUser.username})
            info.context["response"].set_cookie(key=util.ACCESS_TOKEN_NAME, value=access_token)
            return RegisterSuccess(user=authenticatedUser, token=access_token)

        return RegisterError(message="Registration Failed")
