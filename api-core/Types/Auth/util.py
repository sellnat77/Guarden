import os
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from db import SessionLocal, User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
SECRET_KEY = os.environ.get("SECRET_KEY", "default_key")
ALGORITHM = os.environ.get("ALGORITHM", "sha256_crypt")
ACCESS_TOKEN_NAME = 'accessToken'

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


def create_user(username: str, email: str, password: str, profilePicture: str) -> Optional[User]:
    print(username, email, password)
    hashed_password = hash_password(password)
    with SessionLocal() as sess:
        newUser = User(username=username, email=email, password=hashed_password, profilePicture=profilePicture)
        sess.add(newUser)
        sess.commit()
        addedUser = sess.query(User).filter_by(username=username).first()
        return addedUser


async def authenticate_user(username: str, password: str) -> Optional[User]:
    with SessionLocal() as sess:
        user = sess.query(User).filter_by(username=username).first()
        if not user or not verify_password(password, user.password):
            return None
        return user


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
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

    with SessionLocal() as sess:
        verifiedUser = sess.query(User).filter_by(username=username).first()
        if not verifiedUser:
            raise cred_exc

        return verifiedUser
