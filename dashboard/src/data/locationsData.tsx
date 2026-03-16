import { gql } from "graphql-request";

export const getLocations = gql`
  query getLocations {
    location {
      getLocations {
        id
        name
      }
    }
  }
`;

export const getLocation = gql`
  query fetchLocation($id: Int!) {
    location {
      getLocations(filters: { id: $id }) {
        name
      }
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
export interface AddLocationInput {
  name: string;
}

export interface PlantLocation {
  id: string;
  name: string;
}
