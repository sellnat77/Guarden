import db
from sqlalchemy import select, ScalarResult, Result, Sequence
from datetime import datetime
from typing import List

from Types.Location import LocationMutations

import strawberry
from strawberry_sqlalchemy_mapper import StrawberrySQLAlchemyMapper
from asyncpg import Record

from db import database, SessionLocal

strawberry_sqlalchemy_mapper = StrawberrySQLAlchemyMapper()

# @strawberry_sqlalchemy_mapper.type(db.User)
# class User:
#     pass

@strawberry_sqlalchemy_mapper.type(db.Location)
class Location:
    pass

# @strawberry_sqlalchemy_mapper.type(db.Vital)
# class Vital:
#     pass

@strawberry_sqlalchemy_mapper.type(db.Plant)
class Plant:
    pass


@strawberry.type
class Query:

    # @strawberry.field
    # async def users(self) -> ScalarResult[User]:
    #     return await AsyncSessionLocal().scalars(select(User))

    @strawberry.field
    async def locations(self) -> List[Location]:
        with SessionLocal() as session:
            locations = session.scalars(select(db.Location)).all()
            print(locations)
            return list(locations)

    # @strawberry.field
    # async def vitals(self) -> ScalarResult[Vital]:
    #     return await AsyncSessionLocal().scalars(select(Vital))
    @strawberry.field
    async def plants(self)->List[Plant]:
        with SessionLocal() as session:
            plants = session.scalars(select(db.Plant)).all()
            return list(plants)


@strawberry.type
class Mutation:
    @strawberry.field
    def location(self) -> LocationMutations:
        return LocationMutations()

strawberry_sqlalchemy_mapper.finalize()
schema = strawberry.Schema(
    query=Query, mutation=Mutation, types=[Plant, Location]
)
