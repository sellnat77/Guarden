import { graphql } from "./gql";

export const PlantFragment = graphql(`
  fragment PlantFragment on Plant {
    id
    name
    species
    image
    generalHealth
    lightRequirements
    lastPruned
    lastWatered
    lastRepotted
    lastFertilized
    locationId
    location {
      lightProvided
    }
  }
`);

export const getPlantsAndLocations = graphql(`
  query Dashboard_getPlantsAndLocations($currentUser: Int!) {
    plant {
      getPlants(filters: { createdBy: $currentUser }) {
        ...PlantFragment
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

export const VitalDetailFragment = graphql(`
  fragment VitalDetailFragment on VitalModel {
    date
    healthPct
    id
    image
    notes
  }
`);

export const LocationDetailFragment = graphql(`
  fragment LocationDetailFragment on Location {
    id
    name
    lightProvided
  }
`);

export const PlantDetailFragment = graphql(`
  fragment PlantDetailFragment on Plant {
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
    location {
      ...LocationDetailFragment
    }
    name
    pruneFrequencyDays
    repotFrequencyDays
    species
    waterFrequencyDays
    vitals {
      edges {
        node {
          ...VitalDetailFragment
        }
      }
    }
  }
`);

export const getPlantDetails = graphql(`
  query PlantDetail_getPlantDetails($plantId:Int!) {
    plant {
      getPlants(filters: {id: $plantId}) {
        ...PlantDetailFragment
      }
    }
  }
`);
