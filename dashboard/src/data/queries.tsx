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


export const getPlantDetails = graphql(`
  query PlantDetail_getPlantDetails($plantId:Int!) {
    plant {
      getPlants(filters: {id: $plantId}) {
        createdById
        description
        fertilizeFrequencyDays
        generalHealth
        id
        image
        lastFertilized
        lastPruned
        lastRepotted
        lastWatered
        lightRequirements
        locationId
        name
        pruneFrequencyDays
        repotFrequencyDays
        species
        waterFrequencyDays
        vitals {
          edges {
            node {
              date
              healthPct
              id
              image
              notes
            }
          }
        }
      }
    }
  }
`);
