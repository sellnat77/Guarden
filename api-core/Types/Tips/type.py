from uuid import uuid4
import strawberry



@strawberry.type
class Tip:
    id: str = str(uuid4())
    tip: str | None
