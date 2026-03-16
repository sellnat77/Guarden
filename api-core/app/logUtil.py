import json
import logging
import os
import sys

from pythonjsonlogger import jsonlogger


class CustomJsonEncoder(json.JSONEncoder):
    def encode(self, o):
        if "json_fields" not in o:
            return " ".join(o.values())

        extra = json.dumps(o["json_fields"], indent=2, sort_keys=True, default=str)
        del o["json_fields"]
        return " ".join(o.values()) + " " + extra


logger = logging.getLogger(__name__)
logger.setLevel(os.getenv("LOG_LEVEL", "INFO"))
logHandler = logging.StreamHandler(sys.stdout)
formatter = jsonlogger.JsonFormatter(
    fmt="%(asctime)s %(levelname)s %(message)s", json_encoder=CustomJsonEncoder
)
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
