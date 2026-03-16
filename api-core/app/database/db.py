import os
from typing import List

from alembic import command
from alembic.config import Config
from databases import Database
from sqlalchemy import (
    DATETIME,
    DateTime,
    ForeignKey,
    Integer,
    String,
    create_engine,
    event,
    func,
)
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

DATABASE_URL = f"postgresql://{dbUser}:{dbPass}@{dbHost}:{dbPort}/{dbName}"
database = Database(DATABASE_URL)

# Database setup
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)


def initialize_table(target, connection, **kw):
    tablename = str(target.__tablename__)
    if tablename in INITIAL_DATA and len(INITIAL_DATA[tablename]) > 0:
        for row in INITIAL_DATA[tablename]:
            newItem = target(**row)
            connection.merge(newItem)
            logger.debug("Added row", extra={"json_fields": {"row": row}})
        connection.commit()
        logger.debug("Seeded table", extra={"json_fields": {"table": tablename}})


async def connect():
    await database.connect()
    Base.metadata.create_all(engine)
    initialize_table(UserModel, SessionLocal())
    initialize_table(LocationModel, SessionLocal())
    initialize_table(PlantModel, SessionLocal())
    initialize_table(VitalModel, SessionLocal())
    initialize_table(TipModel, SessionLocal())


async def disconnect():
    await database.disconnect()
