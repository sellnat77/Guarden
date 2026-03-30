import asyncio
import os

from dotenv import load_dotenv

from app.database.db import connect, disconnect, run_migrations
from app.graphql.core.s3Client import init_storage
from app.graphql.schema import get_context, schema
from app.logUtil import logger

load_dotenv()

import json
import logging
import os
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pythonjsonlogger import jsonlogger
from strawberry.fastapi import GraphQLRouter

graphql_app = GraphQLRouter(schema, context_getter=get_context)


@asynccontextmanager
async def lifespan(app: FastAPI):
    run_migrations()
    await connect()
    init_storage()
    logger.debug(
        "Initialized startup services",
        extra={"json_fields": {"cool": "beans", "id": 3}},
    )
    yield
    await disconnect()


app = FastAPI(lifespan=lifespan)
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    os.getenv("PUBLIC_URL"),
]

app.add_middleware(
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    middleware_class=CORSMiddleware,
)
app.include_router(graphql_app, prefix="/graphql")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app="main:app", host="0.0.0.0", port=8000, reload=True)
