import string
from datetime import datetime
from typing import List

import strawberry
from asyncpg import Record
from sqlalchemy import Result, ScalarResult, Sequence, select
from strawberry_sqlalchemy_mapper import (
    StrawberrySQLAlchemyLoader,
    StrawberrySQLAlchemyMapper,
)

import db
from db import SessionLocal, database
from s3Client import (
    GenerateUploadUrlInput,
    GenerateUploadUrlOutput,
    generatePresignedUploadUrl,
)
from Types.Location import LocationMutations
from Types.Plant import PlantMutations
from Types.Tip import TipMutations
from Types.User import UserMutations
from Types.Vital import VitalMutations

strawberry_sqlalchemy_mapper = StrawberrySQLAlchemyMapper(always_use_list=False)


@strawberry_sqlalchemy_mapper.type(db.User)
class User:
    pass


@strawberry_sqlalchemy_mapper.type(db.Tip)
class Tip:
    pass


@strawberry_sqlalchemy_mapper.type(db.Location)
class Location:
    pass


@strawberry_sqlalchemy_mapper.type(db.Vital)
class Vital:
    pass


@strawberry_sqlalchemy_mapper.type(db.Plant)
class Plant:
    pass


@strawberry.type
class Query:

    @strawberry.field
    async def users(self, info: strawberry.Info) -> List[User]:
        with db.SessionLocal() as session:
            return list(session.scalars(select(User)).all())

    @strawberry.field
    async def locations(self, info: strawberry.Info) -> List[Location]:
        with db.SessionLocal() as session:
            locations = session.scalars(select(db.Location)).all()

            return list(locations)

    @strawberry.field
    async def vitals(self, info: strawberry.Info) -> List[Vital]:
        with db.SessionLocal() as session:
            return list(session.scalars(select(Vital)).all())

    @strawberry.field
    async def tips(self, info: strawberry.Info) -> List[Tip]:
        with db.SessionLocal() as session:
            return list(session.scalars(select(Tip)).all())

    @strawberry.field
    async def plants(self, info: strawberry.Info) -> List[Plant]:
        with db.SessionLocal() as session:
            plants = session.scalars(select(db.Plant)).all()
            return list(plants)


@strawberry.type
class Mutation:
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


mySession = SessionLocal()


async def get_context():
    return {
        "sqlalchemy_loader": StrawberrySQLAlchemyLoader(bind=mySession),
    }


strawberry_sqlalchemy_mapper.finalize()
additional_types = list(strawberry_sqlalchemy_mapper.mapped_types.values())
schema = strawberry.Schema(query=Query, mutation=Mutation, types=additional_types)
