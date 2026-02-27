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

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    plant: Mapped["Plant"] = relationship(
        back_populates="createdBy", cascade="all, delete"
    )


class Location(Base):
    __tablename__ = "locations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    plants: Mapped[List["Plant"]] = relationship(
        back_populates="location", cascade="all, delete"
    )


class Vital(Base):
    __tablename__ = "vitals"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    healthPct: Mapped[int] = mapped_column(Integer, nullable=False)
    notes: Mapped[str] = mapped_column(String(255), nullable=False)
    image: Mapped[str] = mapped_column(String(255), nullable=False)
    date: Mapped[DATETIME] = mapped_column(
        DateTime, nullable=False, server_default=func.now(), default=func.now()
    )
    plantId: Mapped[int] = mapped_column(ForeignKey("plants.id", ondelete="CASCADE"))
    plant: Mapped["Plant"] = relationship(
        back_populates="vitals", cascade="all, delete"
    )


class Tip(Base):
    __tablename__ = "tips"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    tipText: Mapped[str] = mapped_column(String(255), nullable=False)


class Plant(Base):
    __tablename__ = "plants"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    species: Mapped[str] = mapped_column(String(100), nullable=False)
    image: Mapped[str] = mapped_column(String(255), nullable=False)
    generalHealth: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
    lightRequirements: Mapped[int] = mapped_column(Integer, nullable=True)
    waterFrequencyDays: Mapped[int] = mapped_column(Integer, nullable=False)
    fertilizeFrequencyDays: Mapped[int] = mapped_column(Integer, nullable=False)
    pruneFrequencyDays: Mapped[int] = mapped_column(Integer, nullable=False)
    repotFrequencyDays: Mapped[int] = mapped_column(Integer, nullable=False)
    lastWatered: Mapped[DATETIME] = mapped_column(
        DateTime, nullable=False, default=func.now()
    )
    lastPruned: Mapped[DATETIME] = mapped_column(
        DateTime, nullable=False, default=func.now()
    )
    lastFertilized: Mapped[DATETIME] = mapped_column(
        DateTime, nullable=False, default=func.now()
    )
    lastRepotted: Mapped[DATETIME] = mapped_column(
        DateTime, nullable=False, default=func.now()
    )
    locationId: Mapped[int] = mapped_column(
        ForeignKey("locations.id", ondelete="CASCADE")
    )
    createdById: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    location: Mapped[Location] = relationship(
        "Location", back_populates="plants", cascade="all, delete"
    )
    createdBy: Mapped[User] = relationship(
        "User", back_populates="plant", cascade="all, delete"
    )
    vitals: Mapped[List[Vital]] = relationship(
        "Vital", back_populates="plant", cascade="all, delete"
    )


# Database setup
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)

INITIAL_DATA = {
    "users": [{"username": "demo", "email": "demo@example.com", "password": "demo"}],
    "locations": [
        {
            "name": "Office",
        },
        {
            "name": "Backyard Patio",
        },
        {
            "name": "Kitchen",
        },
        {
            "name": "Blacony",
        },
    ],
    "vitals": [
        {
            "plantId": 1,
            "healthPct": 85,
            "notes": "Healthy",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        }
    ],
    "tips": [{"tipText": "Cool tip!"}],
    "plants": [
        {
            "name": "Demonstratus",
            "species": "Succulent",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
            "generalHealth": "healthy",
            "description": "A demo plant",
            "lightRequirements": 3,
            "waterFrequencyDays": 7,
            "fertilizeFrequencyDays": 90,
            "pruneFrequencyDays": 180,
            "repotFrequencyDays": 360,
            "locationId": 1,
            "createdById": 1,
        }
    ],
}


def initialize_table(target, connection, **kw):
    tablename = str(target.__tablename__)
    if tablename in INITIAL_DATA and len(INITIAL_DATA[tablename]) > 0:
        for row in INITIAL_DATA[tablename]:
            newItem = target(**row)
            connection.add(newItem)
        connection.commit()


async def connect():
    await database.connect()
    Base.metadata.create_all(engine)
    if False:
        initialize_table(User, SessionLocal())
        initialize_table(Location, SessionLocal())
        initialize_table(Plant, SessionLocal())
        initialize_table(Vital, SessionLocal())
        initialize_table(Tip, SessionLocal())


async def disconnect():
    await database.disconnect()
