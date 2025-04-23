import { _get } from "./client";
export default {
  list: () => _get("locations"),
  stats: () => _get("locations/stats"),
  detail: (id: string) => _get(`locations/${id}`),
};
