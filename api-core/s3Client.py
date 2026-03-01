import json
import os
from enum import Enum
from typing import Optional

import boto3
import strawberry
from botocore.client import Config
from sqlakeyset.serial.serial import deserialize_int

from logUtil import logger


@strawberry.enum
class StorageBucket(Enum):
    PROFILE = "profile"
    LOCATIONS = "location"
    PLANTS = "plant"
    VITALS = "vital"


@strawberry.input
class GenerateUploadUrlInput:
    bucket: StorageBucket
    key: str
    contentType: strawberry.Maybe[str]


@strawberry.type
class GenerateUploadUrlOutput:
    url: str
    publicUrl: str


S3_SERVER = os.environ.get("OBJECT_STORAGE_SERVER", "http://localhost:9000")

s3 = boto3.client(
    "s3",
    endpoint_url=os.environ.get("OBJECT_STORAGE_SERVER", "http://localhost:9000"),
    aws_access_key_id=os.environ.get("OBJECT_STORAGE_USER", "rustfsadmin"),
    aws_secret_access_key=os.environ.get("OBJECT_STORAGE_PASS", "rustfsadmin"),
    config=Config(signature_version="s3v4"),
    region_name="us-east-1",
)


def init_storage():
    for bucketName in StorageBucket:
        try:
            s3.create_bucket(
                Bucket=bucketName.value,
                ObjectOwnership="BucketOwnerPreferred",
                ACL="public-read",
            )

            # Define the public policy (read-only for all)
            policy = {
                "Statement": [
                    {
                        "Sid": "PublicRead",
                        "Effect": "Allow",
                        "Principal": "*",
                        "Action": "s3:GetObject",
                        "Resource": f"arn:aws:s3:::{bucketName.value}/*",
                    }
                ],
            }

            # Apply the policy
            s3.put_bucket_policy(Bucket=bucketName.value, Policy=json.dumps(policy))
        except s3.exceptions.BucketAlreadyOwnedByYou as e:
            logger.info(
                "Bucket already exists",
                extra={"json_fields": {"bucket": bucketName.value}},
            )


def upload_file(bucket: StorageBucket, filename, file):
    s3.upload_file(filename, bucket.value, file)


def generatePresignedUploadUrl(
    bucket: StorageBucket, key: str, contentTypeInput: strawberry.Some[str] | None
) -> GenerateUploadUrlOutput:
    contentType = "image/jpeg" if not contentTypeInput else contentTypeInput.value

    url = s3.generate_presigned_url(
        ClientMethod="put_object",
        Params={"Bucket": bucket.value, "Key": key, "ContentType": contentType},
        ExpiresIn=600,
    )
    destinationUrl = f"{S3_SERVER}/{bucket.value}/{key}"
    result = GenerateUploadUrlOutput(url=url, publicUrl=destinationUrl)
    logger.debug(
        "Created presigned upload url",
        extra={"json_fields": {"url": url, "publicUrl": destinationUrl}},
    )

    return result
