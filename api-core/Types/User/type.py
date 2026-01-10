import strawberry


@strawberry.type
class User:
    id: str
    username: str | None
    password: str
    email: str
