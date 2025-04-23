import { _get, _post } from "./client";
export default {
  login: (email: string, password: string) =>
    _post(`/auth/login`, { email, password }),
  stats: () => _get("plants/stats"),
  detail: (id: string) => _get(`plants/plant/${id}`),
};
