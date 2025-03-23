from typing import Annotated
from fastapi import FastAPI, File, UploadFile
from app.internal.visionProcessor import VisionProcessor

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/ndvi/upload/")
async def processNDVI(file: UploadFile):
    processor = VisionProcessor(file)
    await processor.prepareImage()
    score = await processor.getNDVIScore()
    print(f'Got ndvi of {score:.2f}')

    return {"filename": file.filename, "ndvi": score, "display": f'{score:.3f}'}
