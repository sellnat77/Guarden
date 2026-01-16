import strawberry


@strawberry.input
class AddTipInput:
    tipText: str
