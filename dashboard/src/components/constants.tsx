export const GRAPHQL_SERVER =
  import.meta.env.VITE_GD_GRAPHQL_SERVER ||
  `${window.location.protocol}//${window.location.hostname}:5000`;
