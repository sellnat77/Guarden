import os

from databases import Database

dbUser = os.environ.get('DB_USERNAME', 'guardener')
dbPass = os.environ.get('DB_PASSWORD', 'guardener')
dbHost = os.environ.get('DB_HOST', 'localhost')
dbPort = os.environ.get('DB_PORT', '5432')
dbName = os.environ.get('DB_NAME', 'guarden')

DATABASE_URL = f"postgresql://{dbUser}:{dbPass}@{dbHost}:{dbPort}/{dbName}"
database = Database(DATABASE_URL)

async def connect():
    await database.connect()

async def disconnect():
    await database.disconnect()
