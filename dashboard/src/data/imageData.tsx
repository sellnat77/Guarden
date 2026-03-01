import axios from "axios";
import { gql } from "graphql-request";

export const getUploadUrl = gql`
  mutation genUrl($urlInput: GenerateUploadUrlInput!) {
    generateUploadUrl(input: $urlInput) {
      url
      publicUrl
    }
  }
`;

export const uploadToS3 = async (url: string, fileContents: File) => {
  const formData = new FormData();
  formData.append("file", fileContents); // The file has be the last element

  const response = await axios.put(url, fileContents, {
    headers: { "Content-Type": "image/jpeg" },
  });

  return response;
};

export const getLocations = gql`
  query getLocations {
    locations {
      id
      name
    }
  }
`;

export const addLocations = gql`
  mutation addLocation($locationInput: AddLocationInput!) {
    location {
      addLocation(input: $locationInput)
    }
  }
`;
export interface GenerateUploadUrlInput {
  bucket: string;
  key: string;
  contentType: string;
}
