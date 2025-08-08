from fastapi import FastAPI, UploadFile

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
    print(score)

    return {"filename": file.filename, "ndvi": score, "display": f"{score:.3f}"}


@app.post("/hsv/upload/")
async def processHSV(file: UploadFile):
    processor = VisionProcessor(file)
    await processor.prepareImage()
    score = await processor.getHSVScore()
    print(score)

    return {"filename": file.filename, "hsv": score, "display": f"{score:.3f}"}
