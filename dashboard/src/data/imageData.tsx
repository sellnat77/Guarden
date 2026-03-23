import axios from "axios";
import { graphql } from "./gql";

export const getUploadUrl = graphql(`
  mutation genUrl($urlInput: GenerateUploadUrlInput!) {
    generateUploadUrl(input: $urlInput) {
      url
      publicUrl
    }
  }
`);

export const uploadToS3 = async (url: string, fileContents: File) => {
  const formData = new FormData();
  formData.append("file", fileContents); // The file has be the last element

  const response = await axios.put(url, fileContents, {
    headers: { "Content-Type": "image/jpeg" },
  });

  return response;
};
