import { gql } from "graphql-request";

export const countLocations = gql`
  query countLocations {
    getAllLocations {
      count
    }
  }
`;


export interface PlantLocation {
  id: string;
  name: string;
}
