from dotenv import load_dotenv
import json
import os

load_dotenv()
from enum import Enum
from typing import Optional

import boto3
import strawberry
from botocore.client import Config

from app.logUtil import logger


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


def is_docker():
    return os.path.exists("/.dockerenv")


default_internal_server = os.environ.get("OBJECT_STORAGE_SERVER", "host.docker.internal") if is_docker() else "localhost"

INTERNAL_S3_SERVER = os.environ.get(
    "PRIVATE_OBJECT_STORAGE_SERVER", f"http://{default_internal_server}:9000"
)


s3 = boto3.client(
    "s3",
    endpoint_url=INTERNAL_S3_SERVER,
    aws_access_key_id=os.environ.get("OBJECT_STORAGE_USER", "rustfsadmin"),
    aws_secret_access_key=os.environ.get("OBJECT_STORAGE_PASS", "rustfsadmin"),
    config=Config(signature_version="s3v4"),
    region_name="us-east-1",
)


def init_storage():
    cors_configuration = {
        "CORSRules": [
            {
                "AllowedHeaders": ["*"],
                "AllowedMethods": ["GET", "PUT"],
                "AllowedOrigins": ["*", "http://localhost:3000"],
                "MaxAgeSeconds": 3000,
            }
        ]
    }
    for bucketName in StorageBucket:
        try:
            s3.create_bucket(
                Bucket=bucketName.value,
                ObjectOwnership="BucketOwnerPreferred",
                ACL="public-read",
            )

            # Define the public policy (read-only for all)
            policy = {
                "Version": "2012-10-17",
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
        try:
            s3.put_bucket_cors(
                Bucket=bucketName.value, CORSConfiguration=cors_configuration
            )
        except s3.exceptions.BucketAlreadyExists:
            logger.info(
                f"Skipping CORS config for bucket {bucketName.value}: already exists"
            )
        except Exception as e:
            logger.error(
                f"CORS policy error for bucket {bucketName.value}: {e}",
                extra={"json_fields": {"error": str(e), "bucket": bucketName.value}},
            )


def upload_file(bucket: StorageBucket, filename, file):
    s3.upload_file(filename, bucket.value, file)


EXTERNAL_S3_SERVER = os.environ.get(
    "PUBLIC_OBJECT_STORAGE_SERVER", "http://localhost:9900"
)
public_s3 = boto3.client(
    "s3",
    endpoint_url=EXTERNAL_S3_SERVER,
    aws_access_key_id=os.environ.get("OBJECT_STORAGE_USER", "rustfsadmin"),
    aws_secret_access_key=os.environ.get("OBJECT_STORAGE_PASS", "rustfsadmin"),
    config=Config(signature_version="s3v4"),
    region_name="us-east-1",
)


def generatePresignedUploadUrl(
    bucket: StorageBucket, key: str, contentTypeInput: strawberry.Some[str] | None
) -> GenerateUploadUrlOutput:
    contentType = "image/jpeg" if not contentTypeInput else contentTypeInput.value

    url = public_s3.generate_presigned_url(
        ClientMethod="put_object",
        Params={"Bucket": bucket.value, "Key": key, "ContentType": contentType},
        ExpiresIn=600,
    )
    destinationUrl = f"{EXTERNAL_S3_SERVER}/{bucket.value}/{key}"
    result = GenerateUploadUrlOutput(url=url, publicUrl=destinationUrl)
    logger.debug(
        "Created presigned upload url",
        extra={"json_fields": {"url": url, "publicUrl": destinationUrl}},
    )

    return result
