import { GraphQLClient } from "graphql-request";
import { getSdk } from "../../generated/graphql";

const client = getSdk(
  new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL as string)
);

export default client;
