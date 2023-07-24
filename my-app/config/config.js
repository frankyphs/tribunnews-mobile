import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://tribunmobile.frankyphs.site/",
  cache: new InMemoryCache(),
});

export default client;
