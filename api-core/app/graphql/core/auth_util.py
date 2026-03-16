import os
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.database.models import UserModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
SECRET_KEY = os.environ.get("SECRET_KEY", "default_key")
ALGORITHM = os.environ.get("ALGORITHM", "HS256")
ACCESS_TOKEN_NAME = "accessToken"


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    print(plain)
    print(hashed)
    return pwd_context.verify(plain, hashed)


def create_access_token(
    data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES
) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_user(session: Session, user: UserModel) -> Optional[UserModel]:
    hashed_password = hash_password(user.password)

    newUser = user
    newUser.password = hashed_password
    session.add(newUser)
    session.commit()
    addedUser = session.query(UserModel).filter_by(username=user.username).first()
    return addedUser


async def authenticate_user(
    username: str, password: str, session: Session
) -> Optional[UserModel]:
    user = session.query(UserModel).filter_by(username=username).first()
    if not user or not verify_password(password, user.password):
        return None
    return user


async def get_current_user(
    session: Session, token: str = Depends(oauth2_scheme)
) -> UserModel:
    cred_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: Optional[str] = payload.get("sub")
        if username is None:
            raise cred_exc
    except JWTError:
        raise cred_exc

    verifiedUser = session.query(UserModel).filter_by(username=username).first()
    if not verifiedUser:
        raise cred_exc

    return verifiedUser
