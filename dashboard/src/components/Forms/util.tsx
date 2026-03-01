import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { GenerateUploadUrlInput } from "@/data/imageData";
import { uploadToS3 } from "@/data/imageData";

export const handleSignedImageUpload = async (
  imageFile: File | null,
  generateUploadUrl: UseMutateAsyncFunction<
    any,
    Error,
    {
      urlInput: GenerateUploadUrlInput;
    },
    unknown
  >,
  bucket: string,
) => {
  const uuid = crypto.randomUUID();
  const { generateUploadUrl: presignedResult } = await generateUploadUrl({
    urlInput: {
      key: `${uuid}.jpg`,
      bucket: bucket,
      contentType: "image/jpeg",
    },
  });

  if (imageFile) {
    // upload
    await uploadToS3(presignedResult.url, imageFile);
  }
  return presignedResult.publicUrl;
};
