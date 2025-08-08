import cv2
import numpy as np
from fastapi import UploadFile


class VisionProcessor:
    def __init__(self, sourceFile: UploadFile):
        self.sourceFile: UploadFile = sourceFile
        self.sourceImage: np.ndarray
        self.ndviImage: np.ndarray
        self.hsvImage: np.ndarray

    async def prepareImage(self) -> None:
        nparr = np.fromfile(self.sourceFile.file, dtype=np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        self.sourceImage = img
        self.hsvImage = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        self.imageNPArray = np.array(self.sourceImage, dtype=float) / float(255)
        self.contrastAdjusted = await self.adjustContrast()

    async def adjustContrast(self) -> np.ndarray:
        in_min = np.percentile(self.imageNPArray, 5)
        in_max = np.percentile(self.imageNPArray, 95)

        out_min = 0.0
        out_max = 255.0
        out = self.imageNPArray - in_min
        out *= (out_min - out_max) / (in_min - in_max)
        out += in_min

        return out

    async def scaleImage(self) -> None:
        shape = self.sourceImage.shape
        height = int(shape[0] / 2)
        width = int(shape[1] / 2)
        self.sourceImage = cv2.resize(self.sourceImage, (width, height))

    async def calculateNDVI(self) -> None:
        b, g, r = cv2.split(self.contrastAdjusted)
        bottom = r.astype(float) + b.astype(float)
        bottom[bottom == 0] = 0.01
        ndvi = (b.astype(float) - r) / bottom
        self.ndviImage = ndvi

    async def getNDVIScore(self) -> float:
        await self.calculateNDVI()
        return np.nanmean(np.where(self.ndviImage != 0, self.ndviImage, np.nan))

    async def getHSVScore(self) -> float:
        lowerGreen = np.array([30, 50, 50])
        upperGreen = np.array([90, 255, 255])
        lowerUnhealthy = np.array([0, 50, 50])
        upperUnhealthy = np.array([30, 255, 255])

        healthyMask = cv2.inRange(self.hsvImage, lowerGreen, upperGreen)
        unhealthyMask = cv2.inRange(self.hsvImage, lowerUnhealthy, upperUnhealthy)

        totalPixels = np.sum(healthyMask > 0) + np.sum(unhealthyMask > 0)
        healthyPixels = np.sum(healthyMask > 0)
        unhealthyPixels = np.sum(unhealthyMask > 0)

        healthyPercentage = (
            (healthyPixels / totalPixels) * 100 if totalPixels > 0 else 0
        )
        unhealthyPercentage = (
            (unhealthyPixels / totalPixels) * 100 if totalPixels > 0 else 0
        )
        print(f"healthy {healthyPercentage:2f} unhealthy {unhealthyPercentage:2f}")

        return healthyPercentage
