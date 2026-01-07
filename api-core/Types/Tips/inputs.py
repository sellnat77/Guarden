import strawberry

@strawberry.input
class AddTipInput:
    tip_text: str
