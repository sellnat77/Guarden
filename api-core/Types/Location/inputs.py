import strawberry


@strawberry.input
class AddLocationInput:
    name: str
