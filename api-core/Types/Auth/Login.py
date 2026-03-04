import token
import strawberry
from typing import Annotated, Union, TYPE_CHECKING
from . import util

if TYPE_CHECKING:
    from core_schema import User


@strawberry.type
class LoginSuccess:
    user: Annotated["User", strawberry.lazy("core_schema")]
    token: str

@strawberry.type
class LoginError:
    message: str

LoginResult = Annotated[
    Union[LoginSuccess, LoginError],
    strawberry.union("LoginResult")
]

@strawberry.type
class LoginMutation:
    @strawberry.mutation
    async def loginUser(self, username: str, password: str, info) -> LoginResult:
        authenticatedUser  = await util.authenticate_user(username, password)
        if authenticatedUser:
            access_token = util.create_access_token({"sub": authenticatedUser.username})
            return LoginSuccess(user=authenticatedUser, token=access_token)

        return LoginError(message="Login Failed")
