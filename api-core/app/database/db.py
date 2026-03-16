import os
from typing import List

from alembic import command
from alembic.config import Config
from databases import Database
from sqlalchemy import (
    DATETIME,
    AsyncAdaptedQueuePool,
    DateTime,
    ForeignKey,
    Integer,
    MetaData,
    String,
    create_engine,
    event,
    func,
)
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import (
    Mapped,
    Relationship,
    mapped_column,
    relationship,
    sessionmaker,
)

from app.database.models import (
    INITIAL_DATA,
    Base,
    LocationModel,
    PlantModel,
    TipModel,
    UserModel,
    VitalModel,
)
from app.logUtil import logger


def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


dbUser = os.environ.get("POSTGRES_USER", "guardener")
dbPass = os.environ.get("POSTGRES_PASSWORD", "guardener")
dbHost = os.environ.get("GD_DB_HOST", "localhost")
dbPort = os.environ.get("GD_DB_PORT", "5432")
dbName = os.environ.get("POSTGRES_DB", "guarden")

DATABASE_URL = f"postgresql+asyncpg://{dbUser}:{dbPass}@{dbHost}:{dbPort}/{dbName}"
database = Database(DATABASE_URL)

# Database setup
engine = create_async_engine(
    DATABASE_URL,
    poolclass=AsyncAdaptedQueuePool,
    pool_size=10,
    max_overflow=20,
    echo=True,
)
SessionLocal = async_sessionmaker(bind=engine, autoflush=False)


async def initialize_table(target, connection, **kw):
    tablename = str(target.__tablename__)
    if tablename in INITIAL_DATA and len(INITIAL_DATA[tablename]) > 0:
        for row in INITIAL_DATA[tablename]:
            newItem = target(**row)
            await connection.merge(newItem)
            logger.debug("Added row", extra={"json_fields": {"row": row}})
        await connection.commit()
        logger.debug("Seeded table", extra={"json_fields": {"table": tablename}})


async def connect():
    await database.connect()
    async with engine.begin() as conn:
        await conn.run_sync(MetaData().create_all)
        await initialize_table(UserModel, SessionLocal())
        await initialize_table(LocationModel, SessionLocal())
        await initialize_table(PlantModel, SessionLocal())
        await initialize_table(VitalModel, SessionLocal())
        await initialize_table(TipModel, SessionLocal())


async def disconnect():
    await database.disconnect()
