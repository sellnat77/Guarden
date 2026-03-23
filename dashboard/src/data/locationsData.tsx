import { graphql } from "./gql";

export const getLocations = graphql(`
  query getLocations {
    location {
      getLocations {
        id
        name
      }
    }
  }
`);

export const getLocation = graphql(`
  query fetchLocation($id: Int!) {
    location {
      getLocations(filters: { id: $id }) {
        name
      }
    }
  }
`);

export const addLocations = graphql(`
  mutation addLocation($locationInput: AddLocationInput!) {
    location {
      addLocation(input: $locationInput)
    }
  }
`);
