import request from "graphql-request";
import { useMutation } from "@tanstack/react-query";
import type { GenerateUploadUrlInput } from "@/data/imageData";
import { getUploadUrl, uploadToS3 } from "@/data/imageData";

const { mutateAsync: generateUploadUrl } = useMutation({
  mutationKey: ["generateUrl"],
  mutationFn: async (payload: { urlInput: GenerateUploadUrlInput }) =>
    await request(
      `${import.meta.env.VITE_GD_GRAPHQL_SERVER}/graphql`,
      getUploadUrl,
      payload,
    ),
});

export const handleSignedImageUpload = async (
  imageFile: File | null,
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
