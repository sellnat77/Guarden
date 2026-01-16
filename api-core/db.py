import os
from typing import List

from databases import Database
from sqlalchemy import (
    DATETIME,
    DateTime,
    ForeignKey,
    Integer,
    String,
    create_engine,
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

dbUser = os.environ.get("POSTGRES_USER", "guardener")
dbPass = os.environ.get("POSTGRES_PASSWORD", "guardener")
dbHost = os.environ.get("GD_DB_HOST", "localhost")
dbPort = os.environ.get("GD_DB_PORT", "5432")
dbName = os.environ.get("POSTGRES_DB", "guarden")

DATABASE_URL = f"postgresql://{dbUser}:{dbPass}@{dbHost}:{dbPort}/{dbName}"
print(DATABASE_URL)
print("\n\n\n\n\n\n\n\n\n\n")
database = Database(DATABASE_URL)

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    plant: Mapped["Plant"] = relationship(back_populates="createdBy")


class Location(Base):
    __tablename__ = "locations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    plant: Mapped["Plant"] = relationship(back_populates="location")


class Vital(Base):
    __tablename__ = "vitals"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    healthPct: Mapped[int] = mapped_column(Integer, nullable=False)
    notes: Mapped[str] = mapped_column(String(255), nullable=False)
    plantId: Mapped[int] = mapped_column(ForeignKey("plants.id"))
    plant: Mapped["Plant"] = relationship(back_populates="vitals")


class Plant(Base):
    __tablename__ = "plants"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    species: Mapped[str] = mapped_column(String(100), nullable=False)
    image: Mapped[str] = mapped_column(String(255), nullable=False)
    generalHealth: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)
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
    lastRePotted: Mapped[DATETIME] = mapped_column(
        DateTime, nullable=False, default=func.now()
    )
    locationId: Mapped[int] = mapped_column(ForeignKey("locations.id"))
    createdById: Mapped[int] = mapped_column(ForeignKey("users.id"))
    location: Mapped[Location] = relationship("Location", back_populates="plant")
    createdBy: Mapped[User] = relationship("User", back_populates="plant")
    vitals: Mapped[List[Vital]] = relationship("Vital", back_populates="plant")


# Database setup
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def connect():
    await database.connect()
    Base.metadata.create_all(engine)


async def disconnect():
    await database.disconnect()
