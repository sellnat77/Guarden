import strawberry

from app.graphql.core.s3Client import (
    GenerateUploadUrlInput,
    GenerateUploadUrlOutput,
    generatePresignedUploadUrl,
)
from app.graphql.types.auth import AuthMutations
from app.graphql.types.location import LocationMutations
from app.graphql.types.plant import PlantMutations
from app.graphql.types.tip import TipMutations
from app.graphql.types.user import UserMutations
from app.graphql.types.vital import VitalMutations


@strawberry.type
class Mutation:
    @strawberry.field
    async def auth(self) -> AuthMutations:
        return AuthMutations()

    @strawberry.field
    def location(self) -> LocationMutations:
        return LocationMutations()

    @strawberry.field
    def plant(self) -> PlantMutations:
        return PlantMutations()

    @strawberry.field
    def vital(self) -> VitalMutations:
        return VitalMutations()

    @strawberry.field
    def user(self) -> UserMutations:
        return UserMutations()

    @strawberry.field
    def tip(self) -> TipMutations:
        return TipMutations()

    @strawberry.mutation
    async def generateUploadUrl(
        self, input: GenerateUploadUrlInput
    ) -> GenerateUploadUrlOutput:
        return generatePresignedUploadUrl(input.bucket, input.key, input.contentType)
