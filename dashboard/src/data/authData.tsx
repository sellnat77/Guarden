import { gql } from "graphql-request";

export const verifyToken: string = gql`
  query VerifySession($accessToken: String!) {
    auth {
      getVerifiedUserByToken(token: $accessToken) {
        username
        email
        profilePicture
        id
      }
    }
  }
`;
