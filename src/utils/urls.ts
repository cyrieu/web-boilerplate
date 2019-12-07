import { isProd } from "./index";

export function getBackendGraphqlUrl() {
  return isProd()
    ? "https://lang-found-backend.herokuapp.com/graphql"
    : "http://localhost:4000/graphql";
}

export function getFrontendUrl() {
  return isProd() ? "https://app.usefound.app" : "http://localhost:3000";
}
