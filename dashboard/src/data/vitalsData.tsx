import { graphql } from "./gql";

export const addVitals = graphql(`
  mutation addVital($vitalInput: AddVitalInput!) {
    vital {
      addVital(input: $vitalInput)
    }
  }
`);

export const getAllVitals = graphql(`
  query getAllVitals {
    vital {
      getVitals {
        healthPct
        date
      }
    }
  }
`);

export const getVitalsForPlant = graphql(`
  query getVitalsForPlant($plantId: Int!) {
    vital {
      getVitals(filters: { plantId: $plantId }) {
        healthPct
        date
      }
    }
  }
`);

export const getVitalsForPlantGroup = graphql(`
  query getVitalsForPlantGroup($plantIds: [Int!]!) {
    vital {
      getVitals(filters: { plantIdIn: $plantIds }) {
        healthPct
        date
      }
    }
  }
`);
