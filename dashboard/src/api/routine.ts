import { _get } from "./client";
export default {
  list: (id: string, token: string) =>
    _get(`routines/location/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  stats: (token: string) =>
    _get("routines/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  detail: (id: string, token: string) =>
    _get(`routines/plant/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
