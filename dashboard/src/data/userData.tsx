import { gql } from "graphql-request";

export const registerUser = gql`
  mutation registerUser($userInput: RegisterUserInput!) {
    auth {
      register {
        registerUser(userInput: $userInput) {
          ... on RegisterSuccess {
            __typename
            token
          }
          ... on RegisterError {
            __typename
            message
          }
        }
      }
    }
  }
`;
export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

export const loginUser: string = gql`
  mutation loginUser($username: String!, $password: String!) {
    auth {
      login {
        loginUser(password: $password, username: $username) {
          ... on LoginSuccess {
            __typename
            token
          }
          ... on LoginError {
            __typename
            message
          }
        }
      }
    }
  }
`;

export interface LoginUserInput {
  username: string;
  password: string;
}
