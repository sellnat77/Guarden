from datetime import datetime

import strawberry


@strawberry.input
class AddUserInput:
    username: str
    email: str
    password: str
