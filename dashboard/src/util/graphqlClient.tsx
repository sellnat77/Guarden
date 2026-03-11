import { GraphQLClient } from "graphql-request";
import { GRAPHQL_SERVER } from "@/components/constants";

export const client = new GraphQLClient(`${GRAPHQL_SERVER}/graphql`, {
  fetch: (url, options) => fetch(url, { ...options, credentials: "include" }),
});
