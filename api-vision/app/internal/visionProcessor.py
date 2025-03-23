from fastapi import UploadFile
import cv2
import numpy as np

class VisionProcessor():
    def __init__(self, sourceFile: UploadFile):
        self.sourceFile: UploadFile = sourceFile
        self.sourceImage: np.ndarray = None
        self.ndviImage: np.ndarray = None

    async def prepareImage(self) -> None:
        contents = await self.sourceFile.read()
        nparr = np.fromstring(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        self.sourceImage = img
        self.imageNPArray = np.array(self.sourceImage, dtype=float)/float(255)
        self.contrastAdjusted = await self.adjustContrast()


    async def adjustContrast(self) -> None:
        in_min = np.percentile(self.imageNPArray, 5)
        in_max = np.percentile(self.imageNPArray, 95)

        out_min = 0.0
        out_max = 255.0
        out = self.imageNPArray - in_min
        out *= ((out_min - out_max) / (in_min - in_max))
        out += in_min

        return out

    async def scaleImage(self) -> None:
        shape = self.sourceImage.shape
        height = int(shape[0] / 2)
        width = int(shape[1] / 2)
        self.sourceImage = cv2.resize(self.sourceImage, (width, height))

    async def calculateNDVI(self) -> None:
        b, g, r = cv2.split(self.contrastAdjusted)
        bottom = (r.astype(float) + b.astype(float))
        bottom[bottom==0] = 0.01
        ndvi = (b.astype(float) - r) / bottom
        self.ndviImage = ndvi

    async def getNDVIScore(self) -> float:
        await self.calculateNDVI()
        return np.mean(self.ndviImage)
