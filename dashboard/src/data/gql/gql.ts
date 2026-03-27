 
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query VerifySession($accessToken: String!) {\n    auth {\n      getVerifiedUserByToken(token: $accessToken) {\n        username\n        email\n        profilePicture\n        id\n      }\n    }\n  }\n": typeof types.VerifySessionDocument,
    "\n  mutation genUrl($urlInput: GenerateUploadUrlInput!) {\n    generateUploadUrl(input: $urlInput) {\n      url\n      publicUrl\n    }\n  }\n": typeof types.GenUrlDocument,
    "\n  query getLocations($currentUser: Int!) {\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetLocationsDocument,
    "\n  query fetchLocation($id: Int!) {\n    location {\n      getLocations(filters: { id: $id }) {\n        name\n      }\n    }\n  }\n": typeof types.FetchLocationDocument,
    "\n  mutation addLocation($locationInput: AddLocationInput!) {\n    location {\n      addLocation(input: $locationInput)\n    }\n  }\n": typeof types.AddLocationDocument,
    "\n  query fetchPlants($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n  }\n": typeof types.FetchPlantsDocument,
    "\n  mutation addPlant($addPlantInput: AddPlantInput!) {\n    plant {\n      addPlant(input: $addPlantInput)\n    }\n  }\n": typeof types.AddPlantDocument,
    "\n  mutation deletePlant($deletePlantInput: DeletePlantInput!) {\n    plant {\n      deletePlant(input: $deletePlantInput)\n    }\n  }\n": typeof types.DeletePlantDocument,
    "\n  query Dashboard_getPlantsAndLocations($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n": typeof types.Dashboard_GetPlantsAndLocationsDocument,
    "\n  query PlantDetail_getPlantDetails($plantId:Int!) {\n    plant {\n      getPlants(filters: {id: $plantId}) {\n        createdById\n        description\n        fertilizeFrequencyDays\n        generalHealth\n        id\n        image\n        lastFertilized\n        lastPruned\n        lastRepotted\n        lastWatered\n        lightRequirements\n        locationId\n        name\n        pruneFrequencyDays\n        repotFrequencyDays\n        species\n        waterFrequencyDays\n        vitals {\n          edges {\n            node {\n              date\n              healthPct\n              id\n              image\n              notes\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.PlantDetail_GetPlantDetailsDocument,
    "\n  mutation registerUser($userInput: RegisterUserInput!) {\n    auth {\n      register {\n        registerUser(userInput: $userInput) {\n          ... on RegisterSuccess {\n            __typename\n            token\n          }\n          ... on RegisterError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n": typeof types.RegisterUserDocument,
    "\n  mutation loginUser($username: String!, $password: String!) {\n    auth {\n      login {\n        loginUser(password: $password, username: $username) {\n          ... on LoginSuccess {\n            __typename\n            token\n            user {\n              id\n              username\n              email\n              profilePicture\n            }\n          }\n          ... on LoginError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n": typeof types.LoginUserDocument,
    "\n  mutation addVital($vitalInput: AddVitalInput!) {\n    vital {\n      addVital(input: $vitalInput)\n    }\n  }\n": typeof types.AddVitalDocument,
    "\n  query getAllVitals {\n    vital {\n      getVitals {\n        healthPct\n        date\n      }\n    }\n  }\n": typeof types.GetAllVitalsDocument,
    "\n  query getVitalsForPlant($plantId: Int!) {\n    vital {\n      getVitals(filters: { plantId: $plantId }) {\n        healthPct\n        date\n      }\n    }\n  }\n": typeof types.GetVitalsForPlantDocument,
    "\n  query getVitalsForPlantGroup($plantIds: [Int!]!) {\n    vital {\n      getVitals(filters: { plantIdIn: $plantIds }) {\n        healthPct\n        date\n      }\n    }\n  }\n": typeof types.GetVitalsForPlantGroupDocument,
};
const documents: Documents = {
    "\n  query VerifySession($accessToken: String!) {\n    auth {\n      getVerifiedUserByToken(token: $accessToken) {\n        username\n        email\n        profilePicture\n        id\n      }\n    }\n  }\n": types.VerifySessionDocument,
    "\n  mutation genUrl($urlInput: GenerateUploadUrlInput!) {\n    generateUploadUrl(input: $urlInput) {\n      url\n      publicUrl\n    }\n  }\n": types.GenUrlDocument,
    "\n  query getLocations($currentUser: Int!) {\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n": types.GetLocationsDocument,
    "\n  query fetchLocation($id: Int!) {\n    location {\n      getLocations(filters: { id: $id }) {\n        name\n      }\n    }\n  }\n": types.FetchLocationDocument,
    "\n  mutation addLocation($locationInput: AddLocationInput!) {\n    location {\n      addLocation(input: $locationInput)\n    }\n  }\n": types.AddLocationDocument,
    "\n  query fetchPlants($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n  }\n": types.FetchPlantsDocument,
    "\n  mutation addPlant($addPlantInput: AddPlantInput!) {\n    plant {\n      addPlant(input: $addPlantInput)\n    }\n  }\n": types.AddPlantDocument,
    "\n  mutation deletePlant($deletePlantInput: DeletePlantInput!) {\n    plant {\n      deletePlant(input: $deletePlantInput)\n    }\n  }\n": types.DeletePlantDocument,
    "\n  query Dashboard_getPlantsAndLocations($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n": types.Dashboard_GetPlantsAndLocationsDocument,
    "\n  query PlantDetail_getPlantDetails($plantId:Int!) {\n    plant {\n      getPlants(filters: {id: $plantId}) {\n        createdById\n        description\n        fertilizeFrequencyDays\n        generalHealth\n        id\n        image\n        lastFertilized\n        lastPruned\n        lastRepotted\n        lastWatered\n        lightRequirements\n        locationId\n        name\n        pruneFrequencyDays\n        repotFrequencyDays\n        species\n        waterFrequencyDays\n        vitals {\n          edges {\n            node {\n              date\n              healthPct\n              id\n              image\n              notes\n            }\n          }\n        }\n      }\n    }\n  }\n": types.PlantDetail_GetPlantDetailsDocument,
    "\n  mutation registerUser($userInput: RegisterUserInput!) {\n    auth {\n      register {\n        registerUser(userInput: $userInput) {\n          ... on RegisterSuccess {\n            __typename\n            token\n          }\n          ... on RegisterError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation loginUser($username: String!, $password: String!) {\n    auth {\n      login {\n        loginUser(password: $password, username: $username) {\n          ... on LoginSuccess {\n            __typename\n            token\n            user {\n              id\n              username\n              email\n              profilePicture\n            }\n          }\n          ... on LoginError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation addVital($vitalInput: AddVitalInput!) {\n    vital {\n      addVital(input: $vitalInput)\n    }\n  }\n": types.AddVitalDocument,
    "\n  query getAllVitals {\n    vital {\n      getVitals {\n        healthPct\n        date\n      }\n    }\n  }\n": types.GetAllVitalsDocument,
    "\n  query getVitalsForPlant($plantId: Int!) {\n    vital {\n      getVitals(filters: { plantId: $plantId }) {\n        healthPct\n        date\n      }\n    }\n  }\n": types.GetVitalsForPlantDocument,
    "\n  query getVitalsForPlantGroup($plantIds: [Int!]!) {\n    vital {\n      getVitals(filters: { plantIdIn: $plantIds }) {\n        healthPct\n        date\n      }\n    }\n  }\n": types.GetVitalsForPlantGroupDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query VerifySession($accessToken: String!) {\n    auth {\n      getVerifiedUserByToken(token: $accessToken) {\n        username\n        email\n        profilePicture\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query VerifySession($accessToken: String!) {\n    auth {\n      getVerifiedUserByToken(token: $accessToken) {\n        username\n        email\n        profilePicture\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation genUrl($urlInput: GenerateUploadUrlInput!) {\n    generateUploadUrl(input: $urlInput) {\n      url\n      publicUrl\n    }\n  }\n"): (typeof documents)["\n  mutation genUrl($urlInput: GenerateUploadUrlInput!) {\n    generateUploadUrl(input: $urlInput) {\n      url\n      publicUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getLocations($currentUser: Int!) {\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLocations($currentUser: Int!) {\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchLocation($id: Int!) {\n    location {\n      getLocations(filters: { id: $id }) {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchLocation($id: Int!) {\n    location {\n      getLocations(filters: { id: $id }) {\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addLocation($locationInput: AddLocationInput!) {\n    location {\n      addLocation(input: $locationInput)\n    }\n  }\n"): (typeof documents)["\n  mutation addLocation($locationInput: AddLocationInput!) {\n    location {\n      addLocation(input: $locationInput)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchPlants($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchPlants($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addPlant($addPlantInput: AddPlantInput!) {\n    plant {\n      addPlant(input: $addPlantInput)\n    }\n  }\n"): (typeof documents)["\n  mutation addPlant($addPlantInput: AddPlantInput!) {\n    plant {\n      addPlant(input: $addPlantInput)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePlant($deletePlantInput: DeletePlantInput!) {\n    plant {\n      deletePlant(input: $deletePlantInput)\n    }\n  }\n"): (typeof documents)["\n  mutation deletePlant($deletePlantInput: DeletePlantInput!) {\n    plant {\n      deletePlant(input: $deletePlantInput)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Dashboard_getPlantsAndLocations($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Dashboard_getPlantsAndLocations($currentUser: Int!) {\n    plant {\n      getPlants(filters: { createdBy: $currentUser }) {\n        id\n        name\n        species\n        image\n        generalHealth\n        lastPruned\n        lastWatered\n        lastRepotted\n        lastFertilized\n        locationId\n      }\n    }\n    location {\n      getLocations(filters: { createdBy: $currentUser }) {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PlantDetail_getPlantDetails($plantId:Int!) {\n    plant {\n      getPlants(filters: {id: $plantId}) {\n        createdById\n        description\n        fertilizeFrequencyDays\n        generalHealth\n        id\n        image\n        lastFertilized\n        lastPruned\n        lastRepotted\n        lastWatered\n        lightRequirements\n        locationId\n        name\n        pruneFrequencyDays\n        repotFrequencyDays\n        species\n        waterFrequencyDays\n        vitals {\n          edges {\n            node {\n              date\n              healthPct\n              id\n              image\n              notes\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PlantDetail_getPlantDetails($plantId:Int!) {\n    plant {\n      getPlants(filters: {id: $plantId}) {\n        createdById\n        description\n        fertilizeFrequencyDays\n        generalHealth\n        id\n        image\n        lastFertilized\n        lastPruned\n        lastRepotted\n        lastWatered\n        lightRequirements\n        locationId\n        name\n        pruneFrequencyDays\n        repotFrequencyDays\n        species\n        waterFrequencyDays\n        vitals {\n          edges {\n            node {\n              date\n              healthPct\n              id\n              image\n              notes\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation registerUser($userInput: RegisterUserInput!) {\n    auth {\n      register {\n        registerUser(userInput: $userInput) {\n          ... on RegisterSuccess {\n            __typename\n            token\n          }\n          ... on RegisterError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation registerUser($userInput: RegisterUserInput!) {\n    auth {\n      register {\n        registerUser(userInput: $userInput) {\n          ... on RegisterSuccess {\n            __typename\n            token\n          }\n          ... on RegisterError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($username: String!, $password: String!) {\n    auth {\n      login {\n        loginUser(password: $password, username: $username) {\n          ... on LoginSuccess {\n            __typename\n            token\n            user {\n              id\n              username\n              email\n              profilePicture\n            }\n          }\n          ... on LoginError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($username: String!, $password: String!) {\n    auth {\n      login {\n        loginUser(password: $password, username: $username) {\n          ... on LoginSuccess {\n            __typename\n            token\n            user {\n              id\n              username\n              email\n              profilePicture\n            }\n          }\n          ... on LoginError {\n            __typename\n            message\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addVital($vitalInput: AddVitalInput!) {\n    vital {\n      addVital(input: $vitalInput)\n    }\n  }\n"): (typeof documents)["\n  mutation addVital($vitalInput: AddVitalInput!) {\n    vital {\n      addVital(input: $vitalInput)\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllVitals {\n    vital {\n      getVitals {\n        healthPct\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllVitals {\n    vital {\n      getVitals {\n        healthPct\n        date\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getVitalsForPlant($plantId: Int!) {\n    vital {\n      getVitals(filters: { plantId: $plantId }) {\n        healthPct\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query getVitalsForPlant($plantId: Int!) {\n    vital {\n      getVitals(filters: { plantId: $plantId }) {\n        healthPct\n        date\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getVitalsForPlantGroup($plantIds: [Int!]!) {\n    vital {\n      getVitals(filters: { plantIdIn: $plantIds }) {\n        healthPct\n        date\n      }\n    }\n  }\n"): (typeof documents)["\n  query getVitalsForPlantGroup($plantIds: [Int!]!) {\n    vital {\n      getVitals(filters: { plantIdIn: $plantIds }) {\n        healthPct\n        date\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;