import string
from datetime import datetime
from typing import Any, List, Optional

import strawberry
from asyncpg import Record
from sqlalchemy import Result, ScalarResult, Sequence, select
from strawberry_sqlalchemy_mapper import (
    StrawberrySQLAlchemyLoader,
    StrawberrySQLAlchemyMapper,
)

from app.database.db import SessionLocal
from app.database.models import (
    LocationModel,
    PlantModel,
    TipModel,
    UserModel,
    VitalModel,
)
from app.graphql.mutations import Mutation
from app.graphql.queries import Query

strawberry_sqlalchemy_mapper = StrawberrySQLAlchemyMapper(always_use_list=False)


@strawberry_sqlalchemy_mapper.type(UserModel)
class User:
    __exclude__ = ["plant"]


@strawberry_sqlalchemy_mapper.type(TipModel)
class Tip:
    pass


@strawberry_sqlalchemy_mapper.type(LocationModel)
class Location:
    pass


@strawberry_sqlalchemy_mapper.type(VitalModel)
class Vital:
    __exclude__ = ["plant"]


@strawberry_sqlalchemy_mapper.type(PlantModel)
class Plant:
    __exclude__ = ["location", "createdBy"]


async def get_context():
    dbSession = SessionLocal()
    return {
        "db": dbSession,
        "sqlalchemy_loader": StrawberrySQLAlchemyLoader(
            async_bind_factory=SessionLocal
        ),
    }


strawberry_sqlalchemy_mapper.finalize()
additional_types = list(strawberry_sqlalchemy_mapper.mapped_types.values())
schema = strawberry.Schema(query=Query, mutation=Mutation, types=additional_types)
