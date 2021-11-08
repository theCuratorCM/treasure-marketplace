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
