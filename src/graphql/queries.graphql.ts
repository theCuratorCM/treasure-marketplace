import gql from "graphql-tag";

export const getUserInventory = gql`
  query getUserInventory($id: ID!) {
    user(id: $id) {
      listings {
        id
        expires
        pricePerItem
        quantity
        token {
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
      }
      tokens {
        id
        quantity
        token {
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
      }
    }
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
  query getCollectionListings($id: ID!, $orderDirection: OrderDirection!) {
    collection(id: $id) {
      name
      listings(orderBy: pricePerItem, orderDirection: $orderDirection) {
        user {
          id
        }
        expires
        id
        pricePerItem
        token {
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
