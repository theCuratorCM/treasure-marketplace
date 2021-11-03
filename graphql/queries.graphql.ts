import gql from "graphql-tag";

export const UserQuery = gql`
  query UserQuery {
    users {
      id
    }
  }
`;
