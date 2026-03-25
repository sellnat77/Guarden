/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type AddLocationInput = {
  name: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};

export type AddPlantInput = {
  createdById: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  fertilizeFrequencyDays: Scalars['Int']['input'];
  generalHealth: Scalars['String']['input'];
  image: Scalars['String']['input'];
  lastFertilized: Scalars['DateTime']['input'];
  lastPruned: Scalars['DateTime']['input'];
  lastRepotted: Scalars['DateTime']['input'];
  lastWatered: Scalars['DateTime']['input'];
  locationId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  pruneFrequencyDays: Scalars['Int']['input'];
  repotFrequencyDays: Scalars['Int']['input'];
  species: Scalars['String']['input'];
  waterFrequencyDays: Scalars['Int']['input'];
};

export type AddTipInput = {
  tipText: Scalars['String']['input'];
};

export type AddUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AddVitalInput = {
  date: Scalars['DateTime']['input'];
  healthPct: Scalars['Int']['input'];
  image: Scalars['String']['input'];
  notes: Scalars['String']['input'];
  plantId: Scalars['Int']['input'];
};

export type AuthMutations = {
  __typename?: 'AuthMutations';
  login: LoginMutation;
  register: RegisterMutation;
};

export type AuthQueries = {
  __typename?: 'AuthQueries';
  getVerifiedUserByToken: User;
};


export type AuthQueriesGetVerifiedUserByTokenArgs = {
  token: Scalars['String']['input'];
};

export type DeletePlantInput = {
  id: Scalars['Int']['input'];
};

export type GenerateUploadUrlInput = {
  bucket: StorageBucket;
  contentType?: InputMaybe<Scalars['String']['input']>;
  key: Scalars['String']['input'];
};

export type GenerateUploadUrlOutput = {
  __typename?: 'GenerateUploadUrlOutput';
  publicUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  plants: PlantModelConnection;
  userId: Scalars['Int']['output'];
};


export type LocationPlantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationFilterSetInput = {
  createdBy?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  nameIsNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LocationModel = {
  __typename?: 'LocationModel';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  owner: UserModel;
  plants: PlantModelConnection;
  userId: Scalars['Int']['output'];
};


export type LocationModelPlantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type LocationModelConnection = {
  __typename?: 'LocationModelConnection';
  edges: Array<LocationModelEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
};

export type LocationModelEdge = {
  __typename?: 'LocationModelEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: LocationModel;
};

export type LocationMutations = {
  __typename?: 'LocationMutations';
  addLocation?: Maybe<Scalars['Void']['output']>;
};


export type LocationMutationsAddLocationArgs = {
  input: AddLocationInput;
};

export type LocationQueries = {
  __typename?: 'LocationQueries';
  getLocations: Array<Location>;
};


export type LocationQueriesGetLocationsArgs = {
  filters?: InputMaybe<LocationFilterSetInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export type LoginError = {
  __typename?: 'LoginError';
  message: Scalars['String']['output'];
};

export type LoginMutation = {
  __typename?: 'LoginMutation';
  loginUser: LoginResult;
};


export type LoginMutationLoginUserArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginResult = LoginError | LoginSuccess;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  token: Scalars['String']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: AuthMutations;
  generateUploadUrl: GenerateUploadUrlOutput;
  location: LocationMutations;
  plant: PlantMutations;
  tip: TipMutations;
  user: UserMutations;
  vital: VitalMutations;
};


export type MutationGenerateUploadUrlArgs = {
  input: GenerateUploadUrlInput;
};

/** Information to aid in pagination. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Plant = {
  __typename?: 'Plant';
  createdById: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  fertilizeFrequencyDays: Scalars['Int']['output'];
  generalHealth: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  lastFertilized: Scalars['DateTime']['output'];
  lastPruned: Scalars['DateTime']['output'];
  lastRepotted: Scalars['DateTime']['output'];
  lastWatered: Scalars['DateTime']['output'];
  lightRequirements?: Maybe<Scalars['Int']['output']>;
  locationId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pruneFrequencyDays: Scalars['Int']['output'];
  repotFrequencyDays: Scalars['Int']['output'];
  species: Scalars['String']['output'];
  vitals: VitalModelConnection;
  waterFrequencyDays: Scalars['Int']['output'];
};


export type PlantVitalsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type PlantFilterSetInput = {
  createdBy?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type PlantModel = {
  __typename?: 'PlantModel';
  createdBy: UserModel;
  createdById: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  fertilizeFrequencyDays: Scalars['Int']['output'];
  generalHealth: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  lastFertilized: Scalars['DateTime']['output'];
  lastPruned: Scalars['DateTime']['output'];
  lastRepotted: Scalars['DateTime']['output'];
  lastWatered: Scalars['DateTime']['output'];
  lightRequirements?: Maybe<Scalars['Int']['output']>;
  location: LocationModel;
  locationId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pruneFrequencyDays: Scalars['Int']['output'];
  repotFrequencyDays: Scalars['Int']['output'];
  species: Scalars['String']['output'];
  vitals: VitalModelConnection;
  waterFrequencyDays: Scalars['Int']['output'];
};


export type PlantModelVitalsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type PlantModelConnection = {
  __typename?: 'PlantModelConnection';
  edges: Array<PlantModelEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
};

export type PlantModelEdge = {
  __typename?: 'PlantModelEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: PlantModel;
};

export type PlantMutations = {
  __typename?: 'PlantMutations';
  addPlant?: Maybe<Scalars['Void']['output']>;
  deletePlant?: Maybe<Scalars['Void']['output']>;
};


export type PlantMutationsAddPlantArgs = {
  input: AddPlantInput;
};


export type PlantMutationsDeletePlantArgs = {
  input: DeletePlantInput;
};

export type PlantQueries = {
  __typename?: 'PlantQueries';
  getPlants: Array<Plant>;
};


export type PlantQueriesGetPlantsArgs = {
  filters?: InputMaybe<PlantFilterSetInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  auth: AuthQueries;
  location: LocationQueries;
  plant: PlantQueries;
  tip: TipQueries;
  user: UserQueries;
  vital: VitalQueries;
};

export type RegisterError = {
  __typename?: 'RegisterError';
  message: Scalars['String']['output'];
};

export type RegisterMutation = {
  __typename?: 'RegisterMutation';
  registerUser: RegisterResult;
};


export type RegisterMutationRegisterUserArgs = {
  userInput: RegisterUserInput;
};

export type RegisterResult = RegisterError | RegisterSuccess;

export type RegisterSuccess = {
  __typename?: 'RegisterSuccess';
  token: Scalars['String']['output'];
  user: User;
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profilePicture: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export enum StorageBucket {
  Locations = 'LOCATIONS',
  Plants = 'PLANTS',
  Profile = 'PROFILE',
  Vitals = 'VITALS'
}

export type Tip = {
  __typename?: 'Tip';
  id: Scalars['Int']['output'];
  tipText: Scalars['String']['output'];
};

export type TipFilterSetInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type TipMutations = {
  __typename?: 'TipMutations';
  addTip?: Maybe<Scalars['Void']['output']>;
};


export type TipMutationsAddTipArgs = {
  input: AddTipInput;
};

export type TipQueries = {
  __typename?: 'TipQueries';
  getTips: Array<Tip>;
};


export type TipQueriesGetTipsArgs = {
  filters?: InputMaybe<TipFilterSetInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  profilePicture: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserFilterSetInput = {
  createdBy?: InputMaybe<Scalars['String']['input']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  locations: LocationModelConnection;
  password: Scalars['String']['output'];
  plants: PlantModelConnection;
  profilePicture: Scalars['String']['output'];
  username: Scalars['String']['output'];
};


export type UserModelLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type UserModelPlantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type UserMutations = {
  __typename?: 'UserMutations';
  addUser?: Maybe<Scalars['Void']['output']>;
};


export type UserMutationsAddUserArgs = {
  input: AddUserInput;
};

export type UserQueries = {
  __typename?: 'UserQueries';
  getUsers: Array<User>;
};


export type UserQueriesGetUsersArgs = {
  filters?: InputMaybe<UserFilterSetInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export type Vital = {
  __typename?: 'Vital';
  date: Scalars['DateTime']['output'];
  healthPct: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  plantId: Scalars['Int']['output'];
};

export type VitalFilterSetInput = {
  healtPctEqual?: InputMaybe<Scalars['Int']['input']>;
  healtPctOver?: InputMaybe<Scalars['Int']['input']>;
  healtPctUnder?: InputMaybe<Scalars['Int']['input']>;
  plantId?: InputMaybe<Scalars['Int']['input']>;
  plantIdIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type VitalModel = {
  __typename?: 'VitalModel';
  date: Scalars['DateTime']['output'];
  healthPct: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  plant: PlantModel;
  plantId: Scalars['Int']['output'];
};

export type VitalModelConnection = {
  __typename?: 'VitalModelConnection';
  edges: Array<VitalModelEdge>;
  /** Pagination data for this connection */
  pageInfo: PageInfo;
};

export type VitalModelEdge = {
  __typename?: 'VitalModelEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: VitalModel;
};

export type VitalMutations = {
  __typename?: 'VitalMutations';
  addVital?: Maybe<Scalars['Void']['output']>;
};


export type VitalMutationsAddVitalArgs = {
  input: AddVitalInput;
};

export type VitalQueries = {
  __typename?: 'VitalQueries';
  getVitals: Array<Vital>;
};


export type VitalQueriesGetVitalsArgs = {
  filters?: InputMaybe<VitalFilterSetInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: Scalars['Int']['input'];
};

export type VerifySessionQueryVariables = Exact<{
  accessToken: Scalars['String']['input'];
}>;


export type VerifySessionQuery = { __typename?: 'Query', auth: { __typename?: 'AuthQueries', getVerifiedUserByToken: { __typename?: 'User', username: string, email: string, profilePicture: string, id: number } } };

export type GenUrlMutationVariables = Exact<{
  urlInput: GenerateUploadUrlInput;
}>;


export type GenUrlMutation = { __typename?: 'Mutation', generateUploadUrl: { __typename?: 'GenerateUploadUrlOutput', url: string, publicUrl: string } };

export type GetLocationsQueryVariables = Exact<{
  currentUser: Scalars['Int']['input'];
}>;


export type GetLocationsQuery = { __typename?: 'Query', location: { __typename?: 'LocationQueries', getLocations: Array<{ __typename?: 'Location', id: number, name: string }> } };

export type FetchLocationQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FetchLocationQuery = { __typename?: 'Query', location: { __typename?: 'LocationQueries', getLocations: Array<{ __typename?: 'Location', name: string }> } };

export type AddLocationMutationVariables = Exact<{
  locationInput: AddLocationInput;
}>;


export type AddLocationMutation = { __typename?: 'Mutation', location: { __typename?: 'LocationMutations', addLocation?: any | null } };

export type FetchPlantsQueryVariables = Exact<{
  currentUser: Scalars['Int']['input'];
}>;


export type FetchPlantsQuery = { __typename?: 'Query', plant: { __typename?: 'PlantQueries', getPlants: Array<{ __typename?: 'Plant', id: number, name: string, species: string, image: string, generalHealth: string, lastPruned: any, lastWatered: any, lastRepotted: any, lastFertilized: any, locationId: number }> } };

export type AddPlantMutationVariables = Exact<{
  addPlantInput: AddPlantInput;
}>;


export type AddPlantMutation = { __typename?: 'Mutation', plant: { __typename?: 'PlantMutations', addPlant?: any | null } };

export type DeletePlantMutationVariables = Exact<{
  deletePlantInput: DeletePlantInput;
}>;


export type DeletePlantMutation = { __typename?: 'Mutation', plant: { __typename?: 'PlantMutations', deletePlant?: any | null } };

export type Dashboard_GetPlantsAndLocationsQueryVariables = Exact<{
  currentUser: Scalars['Int']['input'];
}>;


export type Dashboard_GetPlantsAndLocationsQuery = { __typename?: 'Query', plant: { __typename?: 'PlantQueries', getPlants: Array<{ __typename?: 'Plant', id: number, name: string, species: string, image: string, generalHealth: string, lastPruned: any, lastWatered: any, lastRepotted: any, lastFertilized: any, locationId: number }> }, location: { __typename?: 'LocationQueries', getLocations: Array<{ __typename?: 'Location', id: number, name: string }> } };

export type RegisterUserMutationVariables = Exact<{
  userInput: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', register: { __typename?: 'RegisterMutation', registerUser:
        | { __typename: 'RegisterError', message: string }
        | { __typename: 'RegisterSuccess', token: string }
       } } };

export type LoginUserMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', auth: { __typename?: 'AuthMutations', login: { __typename?: 'LoginMutation', loginUser:
        | { __typename: 'LoginError', message: string }
        | { __typename: 'LoginSuccess', token: string, user: { __typename?: 'User', id: number, username: string, email: string, profilePicture: string } }
       } } };

export type AddVitalMutationVariables = Exact<{
  vitalInput: AddVitalInput;
}>;


export type AddVitalMutation = { __typename?: 'Mutation', vital: { __typename?: 'VitalMutations', addVital?: any | null } };

export type GetAllVitalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllVitalsQuery = { __typename?: 'Query', vital: { __typename?: 'VitalQueries', getVitals: Array<{ __typename?: 'Vital', healthPct: number, date: any }> } };

export type GetVitalsForPlantQueryVariables = Exact<{
  plantId: Scalars['Int']['input'];
}>;


export type GetVitalsForPlantQuery = { __typename?: 'Query', vital: { __typename?: 'VitalQueries', getVitals: Array<{ __typename?: 'Vital', healthPct: number, date: any }> } };

export type GetVitalsForPlantGroupQueryVariables = Exact<{
  plantIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type GetVitalsForPlantGroupQuery = { __typename?: 'Query', vital: { __typename?: 'VitalQueries', getVitals: Array<{ __typename?: 'Vital', healthPct: number, date: any }> } };


export const VerifySessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifySession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVerifiedUserByToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accessToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<VerifySessionQuery, VerifySessionQueryVariables>;
export const GenUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"genUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"urlInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GenerateUploadUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateUploadUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"urlInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"publicUrl"}}]}}]}}]} as unknown as DocumentNode<GenUrlMutation, GenUrlMutationVariables>;
export const GetLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentUser"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetLocationsQuery, GetLocationsQueryVariables>;
export const FetchLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FetchLocationQuery, FetchLocationQueryVariables>;
export const AddLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationInput"}}}]}]}}]}}]} as unknown as DocumentNode<AddLocationMutation, AddLocationMutationVariables>;
export const FetchPlantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchPlants"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentUser"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"species"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"generalHealth"}},{"kind":"Field","name":{"kind":"Name","value":"lastPruned"}},{"kind":"Field","name":{"kind":"Name","value":"lastWatered"}},{"kind":"Field","name":{"kind":"Name","value":"lastRepotted"}},{"kind":"Field","name":{"kind":"Name","value":"lastFertilized"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}}]}}]}}]}}]} as unknown as DocumentNode<FetchPlantsQuery, FetchPlantsQueryVariables>;
export const AddPlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addPlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addPlantInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPlantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPlant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addPlantInput"}}}]}]}}]}}]} as unknown as DocumentNode<AddPlantMutation, AddPlantMutationVariables>;
export const DeletePlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deletePlantInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePlantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deletePlantInput"}}}]}]}}]}}]} as unknown as DocumentNode<DeletePlantMutation, DeletePlantMutationVariables>;
export const Dashboard_GetPlantsAndLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Dashboard_getPlantsAndLocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlants"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentUser"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"species"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"generalHealth"}},{"kind":"Field","name":{"kind":"Name","value":"lastPruned"}},{"kind":"Field","name":{"kind":"Name","value":"lastWatered"}},{"kind":"Field","name":{"kind":"Name","value":"lastRepotted"}},{"kind":"Field","name":{"kind":"Name","value":"lastFertilized"}},{"kind":"Field","name":{"kind":"Name","value":"locationId"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentUser"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<Dashboard_GetPlantsAndLocationsQuery, Dashboard_GetPlantsAndLocationsQueryVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"loginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auth"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LoginError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const AddVitalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addVital"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"vitalInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddVitalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vital"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addVital"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"vitalInput"}}}]}]}}]}}]} as unknown as DocumentNode<AddVitalMutation, AddVitalMutationVariables>;
export const GetAllVitalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllVitals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vital"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVitals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"healthPct"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllVitalsQuery, GetAllVitalsQueryVariables>;
export const GetVitalsForPlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVitalsForPlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vital"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVitals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"plantId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"healthPct"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetVitalsForPlantQuery, GetVitalsForPlantQueryVariables>;
export const GetVitalsForPlantGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVitalsForPlantGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plantIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vital"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVitals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"plantIdIn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plantIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"healthPct"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetVitalsForPlantGroupQuery, GetVitalsForPlantGroupQueryVariables>;