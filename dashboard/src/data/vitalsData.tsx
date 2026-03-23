import { graphql } from "./gql";

export const addVitals = graphql(`
  mutation addVital($vitalInput: AddVitalInput!) {
    vital {
      addVital(input: $vitalInput)
    }
  }
`);
