import gql from "graphql-tag";

export const getUserTokens = gql`
  query getUserTokens($id: ID!) {
    user(id: $id) {
      tokens {
        id
        collection {
          address
        }
        metadata {
          image
          name
          description
        }
        quantity
        tokenId
      }
      id
    }
  }
`;
