import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";

import Home from "./pages/Home";
import Error from "./pages/Error";
import Project from "./pages/Project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/project/:id" element={<Project />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
};

export default App;
