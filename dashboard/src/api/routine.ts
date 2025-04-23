import { _get } from "./client";
export default {
  list: (id: string) => _get(`routines/location/${id}`),
  stats: () => _get("routines/stats"),
  detail: (id: string) => _get(`routines/plant/${id}`),
};
