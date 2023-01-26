import { ApolloClient, InMemoryCache } from "@apollo/client";

export const enturClient = new ApolloClient({
  uri: "https://api.entur.io/journey-planner/v3/graphql",
  cache: new InMemoryCache(),
});
