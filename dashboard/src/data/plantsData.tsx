import { gql } from "graphql-request";
import type { PlantLocation } from "./locationsData";
import type { Vital } from "./vitalsData";

export const countPlants = gql`
  query fetchPlants {
    plants {
      id
      name
      species
      image
      generalHealth
      lastPruned
      lastWatered
      lastRepotted
      lastFertilized
      location {
        id
        name
      }
      vitals {
        edges {
          node {
            healthPct
          }
        }
      }
    }
  }
`;

export const addPlants = gql`
  mutation addPlant($addPlantInput: AddPlantInput!) {
    plant {
      addPlant(input: $addPlantInput)
    }
  }
`;

export const deletePlant = gql`
  mutation deletePlant($deletePlantInput: DeletePlantInput!) {
    plant {
      deletePlant(input: $deletePlantInput)
    }
  }
`;

export interface AddPlantInput {
  name: string;
  species: string;
  image: string;
  generalHealth: "healthy" | "needs-attention" | "critical";
  description: string;
  waterFrequencyDays: number;
  fertilizeFrequencyDays: number;
  pruneFrequencyDays: number;
  repotFrequencyDays: number;
  lastWatered: string;
  lastPruned: string;
  lastFertilized: string;
  lastRepotted: string;
  locationId: number;
  createdById: number;
}

export interface DeletePlantInput {
  id: number;
}

export interface Plant {
  id: string;
  name: string;
  species: string;
  image: string;
  health: "healthy" | "needs-attention" | "critical";
  lastWatered: string;
  nextWatering: string;
  waterFrequencyDays: number;
  fertilizeFrequencyDays: number;
  lastFertilized: string;
  location: PlantLocation;
  vitalHistory: Array<Vital>;
}

export const plants: Array<Plant> = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    species: "Swiss Cheese Plant",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
    health: "healthy",
    lastWatered: "2023-10-25",
    nextWatering: "2023-11-01",
    waterFrequencyDays: 7,
    fertilizeFrequencyDays: 30,
    lastFertilized: "2023-10-01",
    location: { id: "1", name: "Living Room" },
    vitalHistory: [
      {
        date: "2023-06",
        health: 45,
      },
      {
        date: "2023-07",
        health: 48,
      },
      {
        date: "2023-08",
        health: 52,
      },
      {
        date: "2023-09",
        health: 58,
      },
      {
        date: "2023-10",
        health: 62,
      },
    ],
  },
  {
    id: "2",
    name: "Fiddle Leaf Fig",
    species: "Ficus Lyrata",
    image:
      "https://images.unsplash.com/photo-1597055181300-e30ba15f0d33?auto=format&fit=crop&q=80&w=800",
    health: "needs-attention",
    lastWatered: "2023-10-20",
    nextWatering: "2023-10-27",
    waterFrequencyDays: 7,
    fertilizeFrequencyDays: 14,
    lastFertilized: "2023-09-15",
    location: { id: "1", name: "Living Room" },
    vitalHistory: [
      {
        date: "2023-06",
        health: 120,
      },
      {
        date: "2023-07",
        health: 122,
      },
      {
        date: "2023-08",
        health: 122,
      },
      {
        date: "2023-09",
        health: 125,
      },
      {
        date: "2023-10",
        health: 128,
      },
    ],
  },
  {
    id: "3",
    name: "Snake Plant",
    species: "Sansevieria",
    image:
      "https://images.unsplash.com/photo-1593482886870-927132a9e0ef?auto=format&fit=crop&q=80&w=800",
    health: "healthy",
    lastWatered: "2023-10-10",
    nextWatering: "2023-10-31",
    waterFrequencyDays: 21,
    fertilizeFrequencyDays: 60,
    lastFertilized: "2023-08-01",
    location: { id: "2", name: "Office" },
    vitalHistory: [
      {
        date: "2023-06",
        health: 30,
      },
      {
        date: "2023-07",
        health: 31,
      },
      {
        date: "2023-08",
        health: 32,
      },
      {
        date: "2023-09",
        health: 33,
      },
      {
        date: "2023-10",
        health: 34,
      },
    ],
  },
  {
    id: "4",
    name: "Pothos",
    species: "Epipremnum Aureum",
    image:
      "https://images.unsplash.com/photo-1596724852960-9f9418508a9d?auto=format&fit=crop&q=80&w=800",
    health: "healthy",
    lastWatered: "2023-10-26",
    nextWatering: "2023-10-30",
    waterFrequencyDays: 4,
    fertilizeFrequencyDays: 30,
    lastFertilized: "2023-10-01",
    location: { id: "3", name: "Kitchen" },
    vitalHistory: [
      {
        date: "2023-06",
        health: 15,
      },
      {
        date: "2023-07",
        health: 20,
      },
      {
        date: "2023-08",
        health: 28,
      },
      {
        date: "2023-09",
        health: 35,
      },
      {
        date: "2023-10",
        health: 42,
      },
    ],
  },
  {
    id: "5",
    name: "Peace Lily",
    species: "Spathiphyllum",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55ce32e01b5?auto=format&fit=crop&q=80&w=800",
    health: "needs-attention",
    lastWatered: "2023-10-24",
    nextWatering: "2023-10-28",
    waterFrequencyDays: 4,
    fertilizeFrequencyDays: 45,
    lastFertilized: "2023-09-01",
    location: { id: "4", name: "Bathroom" },
    vitalHistory: [
      {
        date: "2023-06",
        health: 25,
      },
      {
        date: "2023-07",
        health: 26,
      },
      {
        date: "2023-08",
        health: 28,
      },
      {
        date: "2023-09",
        health: 29,
      },
      {
        date: "2023-10",
        health: 30,
      },
    ],
  },
  {
    id: "6",
    name: "Rubber Plant",
    species: "Ficus Elastica",
    image:
      "https://images.unsplash.com/photo-1611211232932-da3113c5b960?auto=format&fit=crop&q=80&w=800",
    health: "healthy",
    lastWatered: "2023-10-15",
    nextWatering: "2023-10-29",
    waterFrequencyDays: 14,
    fertilizeFrequencyDays: 30,
    lastFertilized: "2023-10-05",
    location: { id: "1", name: "Living Room" },
    vitalHistory: [
      {
        date: "2023-06",
        health: 50,
      },
      {
        date: "2023-07",
        health: 55,
      },
      {
        date: "2023-08",
        health: 60,
      },
      {
        date: "2023-09",
        health: 64,
      },
      {
        date: "2023-10",
        health: 68,
      },
    ],
  },
];
