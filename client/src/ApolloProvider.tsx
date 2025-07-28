import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { REFRESH_QUERY } from "./graphql/queries/AuthQueries";
import { GET_CATEGORIES } from "./graphql/queries/CategoryQueries";
// import { LOGIN } from "./graphql/mutation/authMutations";

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem(AUTH_TOKEN);
  console.log("auth link triggerd!");

  const authState = cache.readQuery({
    query: REFRESH_QUERY,
  });

  console.log("authState:", authState);

  // const token = authState?.auth?.accessToken;

  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : ''
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  credentials: "include",
});

export default client;
