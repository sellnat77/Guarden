import strawberry

from app.graphql.types.auth import AuthQueries
from app.graphql.types.location import LocationQueries
from app.graphql.types.plant import PlantQueries
from app.graphql.types.tip import TipQueries
from app.graphql.types.user import UserQueries
from app.graphql.types.vital import VitalQueries


@strawberry.type
class Query:

    @strawberry.field
    async def plant(self) -> PlantQueries:
        return PlantQueries()

    @strawberry.field
    async def user(self) -> UserQueries:
        return UserQueries()

    @strawberry.field
    async def location(self) -> LocationQueries:
        return LocationQueries()

    @strawberry.field
    async def vital(self) -> VitalQueries:
        return VitalQueries()

    @strawberry.field
    async def tip(self) -> TipQueries:
        return TipQueries()

    @strawberry.field
    async def auth(self) -> AuthQueries:
        return AuthQueries()
