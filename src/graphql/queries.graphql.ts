import gql from "graphql-tag";

export const getUserTokens = gql`
  query getUserTokens($id: ID!) {
    user(id: $id) {
      tokens {
        id
        metadataUri
        quantity
        tokenId
        name
      }
      id
    }
  }
`;
