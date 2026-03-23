import { graphql } from "./gql";

export const registerUser = graphql(`
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
`);

export const loginUser = graphql(`
  mutation loginUser($username: String!, $password: String!) {
    auth {
      login {
        loginUser(password: $password, username: $username) {
          ... on LoginSuccess {
            __typename
            token
            user {
              id
              username
              email
              profilePicture
            }
          }
          ... on LoginError {
            __typename
            message
          }
        }
      }
    }
  }
`);
