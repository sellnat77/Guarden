import os

from databases import Database

dbUser = os.environ.get("POSTGRES_USER", "guardener")
dbPass = os.environ.get("POSTGRES_PASSWORD", "guardener")
dbHost = os.environ.get("GD_DB_HOST", "localhost")
dbPort = os.environ.get("GD_DB_PORT", "5432")
dbName = os.environ.get("POSTGRES_DB", "guarden")

DATABASE_URL = f"postgresql://{dbUser}:{dbPass}@{dbHost}:{dbPort}/{dbName}"
print(DATABASE_URL)
print('\n\n\\n\n\n\n\n\n\n')
database = Database(DATABASE_URL)


async def connect():
    await database.connect()


async def disconnect():
    await database.disconnect()
