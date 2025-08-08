import { _get } from "./client";
export default {
  list: (id: string, token: string) =>
    _get(`plants/location/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  stats: (token: string) =>
    _get("plants/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  detail: (id: string, token: string) =>
    _get(`plants/plant/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
