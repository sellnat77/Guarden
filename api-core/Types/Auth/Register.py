from botocore.vendored.six import u

import token
import strawberry
from typing import Annotated, Union, TYPE_CHECKING
from . import util

if TYPE_CHECKING:
    from core_schema import User


@strawberry.type
class RegisterSuccess:
    user: Annotated["User", strawberry.lazy("core_schema")]
    token: str

@strawberry.type
class RegisterError:
    message: str

RegisterResult = Annotated[
    Union[RegisterSuccess, RegisterError],
    strawberry.union("RegisterResult")
]

@strawberry.type
class RegisterMutation:
    @strawberry.mutation
    def registerUser(self, username: str, email:str, password: str, info) -> RegisterResult:
        authenticatedUser  = util.create_user(username, email, password)
        if authenticatedUser:
            access_token = util.create_access_token({"sub": authenticatedUser.username})
            return RegisterSuccess(user=authenticatedUser, token=access_token)

        return RegisterError(message="Registration Failed")
