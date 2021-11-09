import gql from "graphql-tag";

export const getUserInventory = gql`
  query getUserInventory($id: ID!) {
    user(id: $id) {
      listings(where: { status: Active }) {
        id
        expires
        pricePerItem
        quantity
        token {
          ...TokenFields
        }
      }
      sold: listings(where: { status: Sold }) {
        id
        quantity
        pricePerItem
        token {
          ...TokenFields
        }
      }
      tokens {
        id
        quantity
        token {
          ...TokenFields
        }
      }
    }
  }

  fragment TokenFields on Token {
    collection {
      address
    }
    metadata {
      image
      name
      description
    }
    tokenId
  }
`;

export const getCollectionName = gql`
  query getCollectionName($id: ID!) {
    collection(id: $id) {
      id
      name
    }
  }
`;

export const getCollectionListings = gql`
  query getCollectionListings(
    $id: ID!
    $account: String!
    $orderDirection: OrderDirection!
    $tokenName: String
  ) {
    collection(id: $id) {
      name
      address
      listings(
        orderBy: pricePerItem
        orderDirection: $orderDirection
        where: {
          user_not: $account
          status: Active
          tokenName_contains: $tokenName
        }
      ) {
        user {
          id
        }
        expires
        id
        pricePerItem
        token {
          tokenId
          metadata {
            image
            name
            description
          }
        }
        quantity
      }
    }
  }
`;
