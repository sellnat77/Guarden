import { graphql } from "./gql";

export const getPlantsAndLocations = graphql(`
  query Dashboard_getPlantsAndLocations($currentUser: Int!) {
    plant {
      getPlants(filters: { createdBy: $currentUser }) {
        id
        name
        species
        image
        generalHealth
        lastPruned
        lastWatered
        lastRepotted
        lastFertilized
        locationId
      }
    }
    location {
      getLocations(filters: { createdBy: $currentUser }) {
        id
        name
      }
    }
  }
`);
