import { graphql } from "./gql";

export const verifyToken = graphql(`
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
`);
