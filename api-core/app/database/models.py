from datetime import datetime, timezone
from typing import List

from argon2 import PasswordHasher
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
    plants: Mapped[List["PlantModel"]] = relationship(
        back_populates="createdBy", cascade="all, delete", lazy="selectin"
    )
    locations: Mapped[List["LocationModel"]] = relationship(
        back_populates="owner", cascade="all, delete", lazy="selectin"
    )


class LocationModel(Base):
    __tablename__ = "locations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    plants: Mapped[List["PlantModel"]] = relationship(
        back_populates="location", cascade="all, delete", lazy="selectin"
    )
    userId: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    owner: Mapped["UserModel"] = relationship(
        "UserModel", back_populates="locations", lazy="selectin"
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
        "UserModel", back_populates="plants", cascade="all, delete", lazy="selectin"
    )
    vitals: Mapped[List["VitalModel"]] = relationship(
        back_populates="plant", cascade="all, delete", lazy="selectin"
    )


def seed_hash_password(password: str) -> str:
    ph = PasswordHasher()
    return ph.hash(password)


INITIAL_DATA = {
    "users": [
        {
            "id": 1,
            "username": "demo",
            "email": "demo@example.com",
            "password": seed_hash_password("demo"),
            "profilePicture": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        }
    ],
    "locations": [
        {
            "id": 1,
            "name": "Office",
            "userId": 1,
        },
        {
            "id": 2,
            "name": "Backyard Patio",
            "userId": 1,
        },
        {
            "id": 3,
            "name": "Kitchen",
            "userId": 1,
        },
        {
            "id": 4,
            "name": "Blacony",
            "userId": 1,
        },
    ],
    "vitals": [
        # Demonstratus (id 1) — had a rough drought mid-2023, fully recovered by 2025
        {
            "id": 56,
            "plantId": 1,
            "healthPct": 17,
            "date": datetime(2023, 8, 26, 10, 33, 51, tzinfo=timezone.utc),
            "notes": "Shriveled badly, forgot to water for weeks",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        },
        {
            "id": 67,
            "plantId": 1,
            "healthPct": 28,
            "date": datetime(2023, 10, 5, 9, 8, 17, tzinfo=timezone.utc),
            "notes": "Slowly plumping back up after consistent watering",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        },
        {
            "id": 45,
            "plantId": 1,
            "healthPct": 45,
            "date": datetime(2023, 12, 31, 11, 44, 21, tzinfo=timezone.utc),
            "notes": "Noticeable recovery, leaves firming up",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        },
        {
            "id": 34,
            "plantId": 1,
            "healthPct": 62,
            "date": datetime(2024, 3, 15, 12, 50, 44, tzinfo=timezone.utc),
            "notes": "Recovering well, new growth visible",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        },
        {
            "id": 23,
            "plantId": 1,
            "healthPct": 74,
            "date": datetime(2024, 7, 3, 10, 14, 22, tzinfo=timezone.utc),
            "notes": "Looking much better, plump and upright",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        },
        {
            "id": 1,
            "plantId": 1,
            "healthPct": 85,
            "date": datetime(2025, 1, 14, 9, 23, 11, tzinfo=timezone.utc),
            "notes": "Healthy and thriving",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        },
        {
            "id": 20,
            "plantId": 1,
            "healthPct": 91,
            "date": datetime(2025, 3, 21, 13, 17, 58, tzinfo=timezone.utc),
            "notes": "Fully recovered, best shape in over a year",
            "image": "https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/english/wall-2018-whatareplantsmp4.transform/content-tile-large/image.png",
        },
        # Monty (id 2) — spider mites in early 2023, slow treatment and recovery
        {
            "id": 68,
            "plantId": 2,
            "healthPct": 22,
            "date": datetime(2023, 3, 23, 15, 55, 4, tzinfo=timezone.utc),
            "notes": "Spider mite webbing spotted on undersides, treating now",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
        },
        {
            "id": 24,
            "plantId": 2,
            "healthPct": 18,
            "date": datetime(2023, 5, 10, 7, 45, 9, tzinfo=timezone.utc),
            "notes": "Infestation worsening despite treatment, losing leaves",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
        },
        {
            "id": 35,
            "plantId": 2,
            "healthPct": 34,
            "date": datetime(2023, 8, 19, 17, 14, 8, tzinfo=timezone.utc),
            "notes": "Mites finally under control, very slow regrowth",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
        },
        {
            "id": 46,
            "plantId": 2,
            "healthPct": 51,
            "date": datetime(2023, 11, 28, 8, 13, 49, tzinfo=timezone.utc),
            "notes": "Several new leaves, yellowing subsiding",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
        },
        {
            "id": 57,
            "plantId": 2,
            "healthPct": 67,
            "date": datetime(2024, 2, 13, 7, 18, 37, tzinfo=timezone.utc),
            "notes": "Strong new growth, three leaves since last check",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
        },
        {
            "id": 2,
            "plantId": 2,
            "healthPct": 80,
            "date": datetime(2024, 8, 2, 14, 5, 44, tzinfo=timezone.utc),
            "notes": "Looking lush and full again",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
        },
        {
            "id": 3,
            "plantId": 2,
            "healthPct": 92,
            "date": datetime(2025, 3, 19, 8, 47, 30, tzinfo=timezone.utc),
            "notes": "Fully recovered, thriving with new leaf unfurling",
            "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=480&q=80",
        },
        # Percy (id 3) — severe overwatering in late 2023, gradual comeback
        {
            "id": 47,
            "plantId": 3,
            "healthPct": 11,
            "date": datetime(2023, 12, 30, 14, 58, 6, tzinfo=timezone.utc),
            "notes": "Nearly all leaves yellowed, severe overwatering",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
        },
        {
            "id": 25,
            "plantId": 3,
            "healthPct": 24,
            "date": datetime(2024, 2, 14, 15, 22, 47, tzinfo=timezone.utc),
            "notes": "Switching to well-draining mix, a few green leaves remain",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
        },
        {
            "id": 58,
            "plantId": 3,
            "healthPct": 43,
            "date": datetime(2024, 4, 21, 13, 5, 24, tzinfo=timezone.utc),
            "notes": "New vines pushing out, recovery underway",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
        },
        {
            "id": 36,
            "plantId": 3,
            "healthPct": 66,
            "date": datetime(2024, 7, 30, 9, 37, 55, tzinfo=timezone.utc),
            "notes": "Moderate growth, a few pale leaves but improving",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
        },
        {
            "id": 4,
            "plantId": 3,
            "healthPct": 82,
            "date": datetime(2024, 11, 7, 16, 32, 9, tzinfo=timezone.utc),
            "notes": "Excellent growth, vines extending well",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
        },
        {
            "id": 5,
            "plantId": 3,
            "healthPct": 95,
            "date": datetime(2025, 2, 21, 11, 14, 55, tzinfo=timezone.utc),
            "notes": "Looking incredibly lush after watering",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
        },
        {
            "id": 69,
            "plantId": 3,
            "healthPct": 100,
            "date": datetime(2025, 3, 10, 11, 42, 51, tzinfo=timezone.utc),
            "notes": "Cascading beautifully, best it has ever looked",
            "image": "https://images.unsplash.com/photo-1643058193371-01baea73ccd6?w=480&q=80",
        },
        # Sansa (id 4) — consistently healthy snake plant, minor dip in winter 2023
        {
            "id": 37,
            "plantId": 4,
            "healthPct": 88,
            "date": datetime(2023, 5, 14, 14, 22, 31, tzinfo=timezone.utc),
            "notes": "Standing strong, barely needs water",
            "image": "https://images.unsplash.com/photo-1696508902069-c4bf13d19701?w=480&q=80",
        },
        {
            "id": 70,
            "plantId": 4,
            "healthPct": 83,
            "date": datetime(2023, 9, 25, 8, 29, 38, tzinfo=timezone.utc),
            "notes": "Slight tip browning in dry indoor air",
            "image": "https://images.unsplash.com/photo-1696508902069-c4bf13d19701?w=480&q=80",
        },
        {
            "id": 48,
            "plantId": 4,
            "healthPct": 87,
            "date": datetime(2023, 12, 15, 10, 35, 52, tzinfo=timezone.utc),
            "notes": "Solid as ever after adding a humidifier nearby",
            "image": "https://images.unsplash.com/photo-1696508902069-c4bf13d19701?w=480&q=80",
        },
        {
            "id": 26,
            "plantId": 4,
            "healthPct": 93,
            "date": datetime(2024, 4, 11, 9, 0, 5, tzinfo=timezone.utc),
            "notes": "New leaf pushing up from base",
            "image": "https://images.unsplash.com/photo-1696508902069-c4bf13d19701?w=480&q=80",
        },
        {
            "id": 6,
            "plantId": 4,
            "healthPct": 97,
            "date": datetime(2024, 12, 3, 7, 58, 22, tzinfo=timezone.utc),
            "notes": "Very robust, no issues whatsoever",
            "image": "https://images.unsplash.com/photo-1696508902069-c4bf13d19701?w=480&q=80",
        },
        {
            "id": 21,
            "plantId": 4,
            "healthPct": 100,
            "date": datetime(2025, 3, 18, 8, 5, 22, tzinfo=timezone.utc),
            "notes": "Perfect condition, standing tall",
            "image": "https://images.unsplash.com/photo-1696508902069-c4bf13d19701?w=480&q=80",
        },
        # Fifi (id 5) — near death in early 2023, slow long road to recovery
        {
            "id": 71,
            "plantId": 5,
            "healthPct": 3,
            "date": datetime(2023, 2, 12, 14, 16, 25, tzinfo=timezone.utc),
            "notes": "One leaf left, likely a lost cause",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
        },
        {
            "id": 27,
            "plantId": 5,
            "healthPct": 9,
            "date": datetime(2023, 4, 25, 13, 33, 18, tzinfo=timezone.utc),
            "notes": "Two new tiny leaves emerging, holding on",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
        },
        {
            "id": 49,
            "plantId": 5,
            "healthPct": 21,
            "date": datetime(2023, 7, 28, 7, 22, 39, tzinfo=timezone.utc),
            "notes": "Slow but real progress, moved to better light",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
        },
        {
            "id": 38,
            "plantId": 5,
            "healthPct": 35,
            "date": datetime(2023, 10, 12, 11, 9, 16, tzinfo=timezone.utc),
            "notes": "Stable after adjusting watering schedule",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
        },
        {
            "id": 60,
            "plantId": 5,
            "healthPct": 50,
            "date": datetime(2024, 1, 19, 16, 39, 48, tzinfo=timezone.utc),
            "notes": "Halfway there — four healthy leaves now",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
        },
        {
            "id": 7,
            "plantId": 5,
            "healthPct": 62,
            "date": datetime(2024, 6, 29, 13, 41, 17, tzinfo=timezone.utc),
            "notes": "Good recovery, removed last brown leaf",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
        },
        {
            "id": 8,
            "plantId": 5,
            "healthPct": 74,
            "date": datetime(2024, 11, 11, 10, 9, 3, tzinfo=timezone.utc),
            "notes": "Looking dramatically better than a year ago",
            "image": "https://images.unsplash.com/photo-1677428536327-d2aefcec578c?w=480&q=80",
        },
        # Lily (id 6) — wilting episode mid-2023, recovered to peak blooming
        {
            "id": 61,
            "plantId": 6,
            "healthPct": 33,
            "date": datetime(2023, 6, 22, 11, 26, 35, tzinfo=timezone.utc),
            "notes": "Wilting despite watering, drainage issue found",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
        },
        {
            "id": 28,
            "plantId": 6,
            "healthPct": 48,
            "date": datetime(2023, 8, 14, 11, 19, 34, tzinfo=timezone.utc),
            "notes": "Repotted with better drainage, slowly perking up",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
        },
        {
            "id": 50,
            "plantId": 6,
            "healthPct": 63,
            "date": datetime(2023, 10, 14, 13, 47, 14, tzinfo=timezone.utc),
            "notes": "Back to blooming, one flower open",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
        },
        {
            "id": 9,
            "plantId": 6,
            "healthPct": 78,
            "date": datetime(2024, 2, 18, 15, 27, 49, tzinfo=timezone.utc),
            "notes": "New bloom forming, soil moisture perfect",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
        },
        {
            "id": 72,
            "plantId": 6,
            "healthPct": 88,
            "date": datetime(2024, 7, 30, 10, 3, 12, tzinfo=timezone.utc),
            "notes": "Fresh bloom, looking elegant",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
        },
        {
            "id": 39,
            "plantId": 6,
            "healthPct": 95,
            "date": datetime(2024, 11, 20, 8, 48, 59, tzinfo=timezone.utc),
            "notes": "Two blooms open simultaneously, stunning",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
        },
        {
            "id": 10,
            "plantId": 6,
            "healthPct": 100,
            "date": datetime(2025, 3, 8, 9, 53, 36, tzinfo=timezone.utc),
            "notes": "Peak health, three blooms and lush foliage",
            "image": "https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?w=480&q=80",
        },
        # Rudy (id 7) — severe scale infestation in early 2023, treated and thriving
        {
            "id": 40,
            "plantId": 7,
            "healthPct": 14,
            "date": datetime(2023, 4, 7, 15, 31, 42, tzinfo=timezone.utc),
            "notes": "Scale insects covering most stems, heavy treatment begun",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
        },
        {
            "id": 51,
            "plantId": 7,
            "healthPct": 27,
            "date": datetime(2023, 6, 19, 9, 11, 28, tzinfo=timezone.utc),
            "notes": "Scale mostly gone, leaves still damaged",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
        },
        {
            "id": 29,
            "plantId": 7,
            "healthPct": 44,
            "date": datetime(2023, 9, 3, 16, 8, 52, tzinfo=timezone.utc),
            "notes": "New growth coming in clean and healthy",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
        },
        {
            "id": 62,
            "plantId": 7,
            "healthPct": 61,
            "date": datetime(2023, 11, 29, 8, 13, 22, tzinfo=timezone.utc),
            "notes": "Glossy new leaves, strong recovery",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
        },
        {
            "id": 11,
            "plantId": 7,
            "healthPct": 77,
            "date": datetime(2024, 3, 27, 17, 6, 14, tzinfo=timezone.utc),
            "notes": "Deep green leaves returning, very healthy",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
        },
        {
            "id": 12,
            "plantId": 7,
            "healthPct": 88,
            "date": datetime(2024, 8, 4, 12, 38, 52, tzinfo=timezone.utc),
            "notes": "Dusted leaves, excellent light exposure",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
        },
        {
            "id": 63,
            "plantId": 7,
            "healthPct": 96,
            "date": datetime(2025, 2, 27, 14, 0, 9, tzinfo=timezone.utc),
            "notes": "Bold and glossy, fully back to its best",
            "image": "https://images.unsplash.com/photo-1591656884447-8562e2373a66?w=480&q=80",
        },
        # Ziggy (id 8) — consistently excellent, barely any dips
        {
            "id": 41,
            "plantId": 8,
            "healthPct": 85,
            "date": datetime(2023, 3, 25, 10, 5, 27, tzinfo=timezone.utc),
            "notes": "Waxy leaves looking great, very glossy",
            "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=480&q=80",
        },
        {
            "id": 52,
            "plantId": 8,
            "healthPct": 88,
            "date": datetime(2023, 7, 18, 15, 38, 55, tzinfo=timezone.utc),
            "notes": "Completely unbothered, minimal watering needed",
            "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=480&q=80",
        },
        {
            "id": 30,
            "plantId": 8,
            "healthPct": 93,
            "date": datetime(2023, 11, 28, 8, 55, 41, tzinfo=timezone.utc),
            "notes": "Absolutely no issues, thriving as always",
            "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=480&q=80",
        },
        {
            "id": 13,
            "plantId": 8,
            "healthPct": 96,
            "date": datetime(2024, 5, 22, 8, 19, 40, tzinfo=timezone.utc),
            "notes": "Barely needs attention, very resilient",
            "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=480&q=80",
        },
        {
            "id": 22,
            "plantId": 8,
            "healthPct": 99,
            "date": datetime(2024, 11, 22, 15, 34, 10, tzinfo=timezone.utc),
            "notes": "Absolutely thriving with minimal care",
            "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=480&q=80",
        },
        {
            "id": 59,
            "plantId": 8,
            "healthPct": 100,
            "date": datetime(2025, 3, 22, 9, 52, 11, tzinfo=timezone.utc),
            "notes": "Virtually perfect, nothing to report",
            "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=480&q=80",
        },
        # Birdie (id 9) — near death in mid-2023, slow steady climb back
        {
            "id": 64,
            "plantId": 9,
            "healthPct": 8,
            "date": datetime(2023, 5, 14, 10, 47, 56, tzinfo=timezone.utc),
            "notes": "Nearly all leaves brown, very distressed",
            "image": "https://images.unsplash.com/photo-1768368053225-bb828519ad5c?w=480&q=80",
        },
        {
            "id": 31,
            "plantId": 9,
            "healthPct": 17,
            "date": datetime(2023, 7, 17, 14, 27, 3, tzinfo=timezone.utc),
            "notes": "Marginally better, two green leaves remain",
            "image": "https://images.unsplash.com/photo-1768368053225-bb828519ad5c?w=480&q=80",
        },
        {
            "id": 53,
            "plantId": 9,
            "healthPct": 31,
            "date": datetime(2023, 10, 5, 11, 24, 7, tzinfo=timezone.utc),
            "notes": "New paddle leaf emerging from base",
            "image": "https://images.unsplash.com/photo-1768368053225-bb828519ad5c?w=480&q=80",
        },
        {
            "id": 42,
            "plantId": 9,
            "healthPct": 48,
            "date": datetime(2024, 1, 12, 13, 17, 14, tzinfo=timezone.utc),
            "notes": "Steady improvement, soil and light dialled in",
            "image": "https://images.unsplash.com/photo-1768368053225-bb828519ad5c?w=480&q=80",
        },
        {
            "id": 14,
            "plantId": 9,
            "healthPct": 63,
            "date": datetime(2024, 6, 5, 14, 44, 28, tzinfo=timezone.utc),
            "notes": "Leaves unfurling properly, good color",
            "image": "https://images.unsplash.com/photo-1768368053225-bb828519ad5c?w=480&q=80",
        },
        {
            "id": 15,
            "plantId": 9,
            "healthPct": 77,
            "date": datetime(2024, 11, 17, 11, 2, 7, tzinfo=timezone.utc),
            "notes": "Strong and upright, looking much healthier",
            "image": "https://images.unsplash.com/photo-1768368053225-bb828519ad5c?w=480&q=80",
        },
        # Charlotte (id 10) — humidity and overwatering issues in 2023, recovered well
        {
            "id": 43,
            "plantId": 10,
            "healthPct": 26,
            "date": datetime(2023, 2, 27, 9, 52, 3, tzinfo=timezone.utc),
            "notes": "Lots of brown tips, low humidity and overwatering",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
        },
        {
            "id": 65,
            "plantId": 10,
            "healthPct": 38,
            "date": datetime(2023, 5, 11, 7, 34, 43, tzinfo=timezone.utc),
            "notes": "Moved to brighter window, some runners reviving",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
        },
        {
            "id": 32,
            "plantId": 10,
            "healthPct": 52,
            "date": datetime(2023, 8, 22, 10, 41, 29, tzinfo=timezone.utc),
            "notes": "Watering schedule corrected, new runners forming",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
        },
        {
            "id": 54,
            "plantId": 10,
            "healthPct": 67,
            "date": datetime(2023, 11, 22, 8, 59, 43, tzinfo=timezone.utc),
            "notes": "Healthy but needs a bigger pot soon",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
        },
        {
            "id": 16,
            "plantId": 10,
            "healthPct": 80,
            "date": datetime(2024, 4, 1, 16, 55, 19, tzinfo=timezone.utc),
            "notes": "Babies sprouting from runners, thriving",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
        },
        {
            "id": 17,
            "plantId": 10,
            "healthPct": 90,
            "date": datetime(2024, 9, 14, 9, 30, 1, tzinfo=timezone.utc),
            "notes": "Trimmed runners, lush and healthy overall",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
        },
        {
            "id": 55,
            "plantId": 10,
            "healthPct": 97,
            "date": datetime(2025, 3, 14, 14, 46, 19, tzinfo=timezone.utc),
            "notes": "Cascading beautifully, best shape yet",
            "image": "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=480&q=80",
        },
        # Vera (id 11) — critical overwatering crisis, long slow recovery still in progress
        {
            "id": 33,
            "plantId": 11,
            "healthPct": 5,
            "date": datetime(2023, 8, 1, 7, 3, 17, tzinfo=timezone.utc),
            "notes": "Completely mushy base, final attempt to save it",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
        },
        {
            "id": 44,
            "plantId": 11,
            "healthPct": 12,
            "date": datetime(2023, 10, 14, 16, 29, 38, tzinfo=timezone.utc),
            "notes": "Repotted into dry gritty soil, a few leaves firming",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
        },
        {
            "id": 66,
            "plantId": 11,
            "healthPct": 24,
            "date": datetime(2024, 1, 18, 13, 21, 30, tzinfo=timezone.utc),
            "notes": "Slow recovery, switching to terracotta pot helped",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
        },
        {
            "id": 19,
            "plantId": 11,
            "healthPct": 18,
            "date": datetime(2024, 1, 6, 10, 48, 33, tzinfo=timezone.utc),
            "notes": "Brief setback after accidental watering",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
        },
        {
            "id": 18,
            "plantId": 11,
            "healthPct": 31,
            "date": datetime(2024, 4, 28, 7, 12, 45, tzinfo=timezone.utc),
            "notes": "Back on track, new offshoot appearing at base",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
        },
        {
            "id": 35,
            "plantId": 11,
            "healthPct": 47,
            "date": datetime(2024, 8, 15, 11, 33, 20, tzinfo=timezone.utc),
            "notes": "Leaves plumping up again, cautiously optimistic",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
        },
        {
            "id": 36,
            "plantId": 11,
            "healthPct": 62,
            "date": datetime(2025, 1, 9, 9, 17, 44, tzinfo=timezone.utc),
            "notes": "Solid progress, gel visible in leaves again",
            "image": "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=480&q=80",
        },
    ],
    "tips": [
        {"id": 1, "tipText": "Cool tip!"},
        {
            "id": 2,
            "tipText": "Water your plants in the morning so moisture evaporates during the day and reduces the risk of fungal disease.",
        },
        {
            "id": 3,
            "tipText": "Most houseplants prefer room-temperature water — cold tap water can shock tropical plant roots.",
        },
        {
            "id": 4,
            "tipText": "Stick your finger 1–2 inches into the soil before watering. If it's still damp, wait another day or two.",
        },
        {
            "id": 5,
            "tipText": "Overwatering is the #1 killer of houseplants. When in doubt, wait it out.",
        },
        {
            "id": 6,
            "tipText": "Wipe dust off large leaves with a damp cloth to help the plant photosynthesize more efficiently.",
        },
        {
            "id": 7,
            "tipText": "Rotate your pots a quarter turn every week so all sides of the plant get equal light exposure.",
        },
        {
            "id": 8,
            "tipText": "Yellow leaves usually signal overwatering; brown crispy tips usually mean low humidity or underwatering.",
        },
        {
            "id": 9,
            "tipText": "Group plants together to create a microclimate with higher humidity — they'll all benefit.",
        },
        {
            "id": 10,
            "tipText": "Use a pebble tray filled with water beneath pots to boost humidity without waterlogging the roots.",
        },
        {
            "id": 11,
            "tipText": "Fertilize during the growing season (spring and summer) and ease off or stop entirely in fall and winter.",
        },
        {
            "id": 12,
            "tipText": "Always use a pot with drainage holes. Sitting water at the bottom of a pot is a fast track to root rot.",
        },
        {
            "id": 13,
            "tipText": "Repot your plant when roots start poking out of the drainage holes or circling the top of the soil.",
        },
        {
            "id": 14,
            "tipText": "Choose a new pot only 1–2 inches larger in diameter when repotting — too much extra soil holds moisture and can cause rot.",
        },
        {
            "id": 15,
            "tipText": "Prune dead or yellowing leaves promptly to redirect the plant's energy toward healthy new growth.",
        },
        {
            "id": 16,
            "tipText": "Most succulents and cacti thrive on neglect — they prefer bright light and infrequent watering.",
        },
        {
            "id": 17,
            "tipText": "Monsteras love to climb! Give yours a moss pole or trellis and watch it reach its full potential.",
        },
        {
            "id": 18,
            "tipText": "Check the undersides of leaves regularly for pests like spider mites, mealybugs, and scale insects.",
        },
        {
            "id": 19,
            "tipText": "A diluted neem oil spray is an effective, natural solution for most common houseplant pests.",
        },
        {
            "id": 20,
            "tipText": "Keep plants away from heating and air conditioning vents — sudden temperature changes cause stress.",
        },
        {
            "id": 21,
            "tipText": "South-facing windows get the most light in the Northern Hemisphere; north-facing windows get the least.",
        },
        {
            "id": 22,
            "tipText": "Propagate your plants by taking stem or leaf cuttings — it's free and very rewarding!",
        },
        {
            "id": 23,
            "tipText": "Peace Lilies will visibly droop when they're thirsty — they're great at telling you when they need water.",
        },
        {
            "id": 24,
            "tipText": "Avoid placing plants like Fiddle Leaf Figs near drafty windows or doors; they hate fluctuating conditions.",
        },
        {
            "id": 25,
            "tipText": "Add a layer of perlite or coarse sand to your potting mix to improve drainage for most houseplants.",
        },
    ],
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
