import { gql } from "graphql-request";

export const countLocations = gql`
  query countLocations {
    getAllLocations {
      count
    }
  }
`;

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
export interface AddLocationInput {
  name: string;
}

export interface PlantLocation {
  id: string;
  name: string;
}
