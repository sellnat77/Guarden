from typing import List

from passlib.context import CryptContext
from sqlalchemy import DATETIME, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, declarative_base, mapped_column, relationship

Base = declarative_base()


class UserModel(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(500), nullable=False)
    profilePicture: Mapped[str] = mapped_column(String(255), default="", nullable=False)
    plant: Mapped[List["PlantModel"]] = relationship(
        back_populates="createdBy", cascade="all, delete", lazy="selectin"
    )


class LocationModel(Base):
    __tablename__ = "locations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    plants: Mapped[List["PlantModel"]] = relationship(
        back_populates="location", cascade="all, delete", lazy="selectin"
    )


class VitalModel(Base):
    __tablename__ = "vitals"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    healthPct: Mapped[int] = mapped_column(Integer, nullable=False)
    notes: Mapped[str] = mapped_column(String(255), nullable=False)
    image: Mapped[str] = mapped_column(String(255), nullable=False)
    date: Mapped[DATETIME] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        default=func.now(),
    )
    plantId: Mapped[int] = mapped_column(ForeignKey("plants.id", ondelete="CASCADE"))
    plant: Mapped["PlantModel"] = relationship(
        "PlantModel", back_populates="vitals", lazy="selectin"
    )


class TipModel(Base):
    __tablename__ = "tips"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    tipText: Mapped[str] = mapped_column(String(255), nullable=False)


class PlantModel(Base):
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
        DateTime(timezone=True), nullable=False, default=func.now()
    )
    lastPruned: Mapped[DATETIME] = mapped_column(
        DateTime(timezone=True), nullable=False, default=func.now()
    )
    lastFertilized: Mapped[DATETIME] = mapped_column(
        DateTime(timezone=True), nullable=False, default=func.now()
    )
    lastRepotted: Mapped[DATETIME] = mapped_column(
        DateTime(timezone=True), nullable=False, default=func.now()
    )
    locationId: Mapped[int] = mapped_column(
        ForeignKey("locations.id", ondelete="CASCADE")
    )
    location: Mapped["LocationModel"] = relationship(
        "LocationModel", back_populates="plants", lazy="selectin"
    )
    createdById: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    createdBy: Mapped["UserModel"] = relationship(
        "UserModel", back_populates="plant", cascade="all, delete", lazy="selectin"
    )
    vitals: Mapped[List["VitalModel"]] = relationship(
        back_populates="plant", cascade="all, delete", lazy="selectin"
    )


INITIAL_DATA = {
    "users": [
        {
            "id": 1,
            "username": "demo",
            "email": "demo@example.com",
            "password": CryptContext(schemes=["bcrypt"], deprecated="auto").hash(
                "demo"
            ),
            "profilePicture": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        }
    ],
    "locations": [
        {
            "id": 1,
            "name": "Office",
        },
        {
            "id": 2,
            "name": "Backyard Patio",
        },
        {
            "id": 3,
            "name": "Kitchen",
        },
        {
            "id": 4,
            "name": "Blacony",
        },
    ],
    "vitals": [
        {
            "id": 1,
            "plantId": 1,
            "healthPct": 85,
            "notes": "Healthy",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        }
    ],
    "tips": [{"id": 1, "tipText": "Cool tip!"}],
    "plants": [
        {
            "id": 1,
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
        },
        {
            "id": 2,
            "name": "Monty",
            "species": "Monstera deliciosa",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
            "generalHealth": "healthy",
            "description": "A large, striking tropical plant with iconic split leaves.",
            "lightRequirements": 3,
            "waterFrequencyDays": 7,
            "fertilizeFrequencyDays": 30,
            "pruneFrequencyDays": 90,
            "repotFrequencyDays": 730,
            "locationId": 2,
            "createdById": 1,
        },
        {
            "id": 3,
            "name": "Percy",
            "species": "Epipremnum aureum (Pothos)",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
            "generalHealth": "healthy",
            "description": "A hardy trailing vine that thrives in low light conditions.",
            "lightRequirements": 2,
            "waterFrequencyDays": 10,
            "fertilizeFrequencyDays": 60,
            "pruneFrequencyDays": 60,
            "repotFrequencyDays": 365,
            "locationId": 1,
            "createdById": 1,
        },
        {
            "id": 4,
            "name": "Sansa",
            "species": "Sansevieria trifasciata (Snake Plant)",
            "image": "https://images.unsplash.com/photo-1696508902069-c4bf13d19701?w=480&q=80",
            "generalHealth": "healthy",
            "description": "An extremely low-maintenance plant tolerant of neglect.",
            "lightRequirements": 1,
            "waterFrequencyDays": 21,
            "fertilizeFrequencyDays": 90,
            "pruneFrequencyDays": 365,
            "repotFrequencyDays": 730,
            "locationId": 4,
            "createdById": 1,
        },
        {
            "id": 5,
            "name": "Fifi",
            "species": "Ficus lyrata (Fiddle Leaf Fig)",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
            "generalHealth": "needs-attention",
            "description": "A dramatic statement plant with large, violin-shaped leaves.",
            "lightRequirements": 5,
            "waterFrequencyDays": 7,
            "fertilizeFrequencyDays": 30,
            "pruneFrequencyDays": 180,
            "repotFrequencyDays": 365,
            "locationId": 3,
            "createdById": 1,
        },
        {
            "id": 6,
            "name": "Lily",
            "species": "Spathiphyllum wallisii (Peace Lily)",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
            "generalHealth": "healthy",
            "description": "An elegant flowering plant that purifies indoor air.",
            "lightRequirements": 2,
            "waterFrequencyDays": 7,
            "fertilizeFrequencyDays": 60,
            "pruneFrequencyDays": 90,
            "repotFrequencyDays": 365,
            "locationId": 2,
            "createdById": 1,
        },
        {
            "id": 7,
            "name": "Rudy",
            "species": "Ficus elastica (Rubber Plant)",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
            "generalHealth": "healthy",
            "description": "A bold, glossy-leafed tropical tree popular as a houseplant.",
            "lightRequirements": 4,
            "waterFrequencyDays": 10,
            "fertilizeFrequencyDays": 30,
            "pruneFrequencyDays": 180,
            "repotFrequencyDays": 730,
            "locationId": 1,
            "createdById": 1,
        },
        {
            "id": 8,
            "name": "Ziggy",
            "species": "Zamioculcas zamiifolia (ZZ Plant)",
            "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=480&q=80",
            "generalHealth": "healthy",
            "description": "A virtually indestructible plant with waxy, dark green leaves.",
            "lightRequirements": 1,
            "waterFrequencyDays": 21,
            "fertilizeFrequencyDays": 90,
            "pruneFrequencyDays": 365,
            "repotFrequencyDays": 730,
            "locationId": 4,
            "createdById": 1,
        },
        {
            "id": 9,
            "name": "Birdie",
            "species": "Strelitzia reginae (Bird of Paradise)",
            "image": "https://images.unsplash.com/photo-1768368053225-bb828519ad5c?w=480&q=80",
            "generalHealth": "needs-attention",
            "description": "A majestic plant with large paddle-shaped leaves and vivid flowers.",
            "lightRequirements": 5,
            "waterFrequencyDays": 7,
            "fertilizeFrequencyDays": 30,
            "pruneFrequencyDays": 90,
            "repotFrequencyDays": 365,
            "locationId": 3,
            "createdById": 1,
        },
        {
            "id": 10,
            "name": "Charlotte",
            "species": "Chlorophytum comosum (Spider Plant)",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
            "generalHealth": "healthy",
            "description": "A cheerful, fast-growing plant that produces cascading baby plantlets.",
            "lightRequirements": 3,
            "waterFrequencyDays": 7,
            "fertilizeFrequencyDays": 60,
            "pruneFrequencyDays": 60,
            "repotFrequencyDays": 365,
            "locationId": 2,
            "createdById": 1,
        },
        {
            "id": 11,
            "name": "Vera",
            "species": "Aloe barbadensis miller (Aloe Vera)",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
            "generalHealth": "critical",
            "description": "A medicinal succulent with thick, fleshy leaves full of soothing gel.",
            "lightRequirements": 5,
            "waterFrequencyDays": 14,
            "fertilizeFrequencyDays": 90,
            "pruneFrequencyDays": 180,
            "repotFrequencyDays": 730,
            "locationId": 3,
            "createdById": 1,
        },
    ],
}
