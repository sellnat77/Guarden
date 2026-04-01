export const GRAPHQL_SERVER_CODEGEN =
  "http://localhost:5000";

export const GRAPHQL_SERVER =
  import.meta.env.VITE_GD_GRAPHQL_SERVER ||
  `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':5000' : ''}`;
