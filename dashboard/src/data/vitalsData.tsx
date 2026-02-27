import { gql } from "graphql-request";

export const addVitals = gql`
  mutation addVital($vitalInput: AddVitalInput!) {
    vital {
      addVital(input: $vitalInput)
    }
  }
`;
export interface AddVitalInput {
  plantId: string;
  image: string;
  notes: string;
  healthPct: number;
  date: string;
}

export interface Vital {
  date: string;
  health: number;
}
