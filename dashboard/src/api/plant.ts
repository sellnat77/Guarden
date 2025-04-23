import { _get } from "./client";
export default {
  list: (id: string) => _get(`plants/location/${id}`),
  stats: () => _get("plants/stats"),
  detail: (id: string) => _get(`plants/plant/${id}`),
};
