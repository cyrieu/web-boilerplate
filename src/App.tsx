import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import OAuthHandlerPage from "./components/OAuthHandlerPage";
import AuthBrowserPage from "./components/AuthBrowserPage";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { getBackendGraphqlUrl } from "./utils/urls";
import AuthRoute from "./components/AuthRoute";
import AuthPage from "./components/AuthPage";

const client = new ApolloClient({
  uri: getBackendGraphqlUrl(),
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <AuthRoute exact path="/" component={HomePage}></AuthRoute>
          <Route path="/login" component={AuthPage}></Route>
          <Route path="/authbrowser" component={AuthBrowserPage}></Route>
          <Route path="/oauthhandler" component={OAuthHandlerPage}></Route>
          <Route
            path="/asdf"
            component={() => {
              return <div>ajskdf</div>;
            }}
          ></Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
