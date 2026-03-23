import { graphql } from "./gql";
import type { Plant } from "./gql/graphql";

export const countPlants = graphql(`
  query fetchPlants($currentUser: Int!) {
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
  }
`);

export const addPlants = graphql(`
  mutation addPlant($addPlantInput: AddPlantInput!) {
    plant {
      addPlant(input: $addPlantInput)
    }
  }
`);

export const deletePlant = graphql(`
  mutation deletePlant($deletePlantInput: DeletePlantInput!) {
    plant {
      deletePlant(input: $deletePlantInput)
    }
  }
`);

export const plants: Array<Plant> = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    species: "Swiss Cheese Plant",
    description: "Swiss Cheese Plant",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
    generalHealth: "healthy",
    lastWatered: "2023-10-25",
    createdById: 1,
    lastPruned: "",
    lastRepotted: "",
    waterFrequencyDays: 7,
    pruneFrequencyDays: 7,
    repotFrequencyDays: 7,
    fertilizeFrequencyDays: 30,
    lastFertilized: "2023-10-01",
    locationId: 1,
    vitals: {
      edges: [
        {
          node: {
            id: 1,
            image: "",
            notes: "",
            plant: {
              id: 1,
              name: "Monstera Deliciosa",
              species: "Swiss Cheese Plant",
              description: "",
              image:
                "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800",
              generalHealth: "healthy",
              lastWatered: "2023-10-25",
              waterFrequencyDays: 7,
              fertilizeFrequencyDays: 30,
              pruneFrequencyDays: 7,
              repotFrequencyDays: 20,
              vitals: {
                edges: [],
                pageInfo: {
                  hasNextPage: false,
                  hasPreviousPage: false,
                },
              },
              lastFertilized: "2023-10-01",
              locationId: 1,
              location: {
                id: 1,
                name: "test",
                plants: {
                  edges: [],
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                },
              },
              createdBy: {
                id: 1,
                username: "JohnDoe",
                email: "",
                password: "",
                profilePicture: "",
                plant: {
                  edges: [],
                  pageInfo: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                  },
                },
              },
              createdById: 1,
              lastPruned: "",
              lastRepotted: "",
            },
            plantId: 1,
            date: "2023-06",
            healthPct: 45,
          },
          cursor: "",
        },
      ],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    },
  },
];
