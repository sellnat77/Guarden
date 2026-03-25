from datetime import datetime
from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from sqlalchemy.orm import Query

from app.database.models import UserModel
from app.graphql.core.filters import FilterField, FilterSet, Op, apply_filters
from app.graphql.core.input_base import BaseInput

if TYPE_CHECKING:
    from app.graphql.schema import User


@strawberry.input
class AddUserInput(BaseInput):
    username: str
    email: str
    password: str
    profilePicture: str

    def __init__(self):
        self.model_class = UserModel


@strawberry.type
class UserMutations:
    @strawberry.mutation
    async def addUser(self, info: strawberry.Info, input: AddUserInput) -> None:
        db: async_sessionmaker = info.context["db"]

        async with db() as session:
            newUser = input.to_model()
            session.add(newUser)
            await session.commit()


class UserFilterSet(FilterSet):
    created_by = FilterField(UserModel.username, op=Op.eq)


UserFilterInput = UserFilterSet.input_type()


@strawberry.type
class UserQueries:

    @strawberry.field
    async def getUsers(
        self,
        info: strawberry.Info,
        filters: Optional[UserFilterInput] = strawberry.UNSET,
        limit: int | None = None,
        offset: int = 0,
    ) -> List[Annotated["User", strawberry.lazy("app.graphql.schema")]]:
        db: async_sessionmaker = info.context["db"]

        async with db() as session:
            query = apply_filters(Query(UserModel), filters)
            users = await session.execute(query.offset(offset).limit(limit))
            return list(users.scalars())
