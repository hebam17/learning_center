import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloProvider,
  // ApolloClient,
  // InMemoryCache,
  // HttpLink,
} from "@apollo/client";
import client from "./ApolloProvider";

import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
