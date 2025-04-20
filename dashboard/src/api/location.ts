import { _get } from "./client";
export default {
  list: () => _get("locations"),
  detail: (id: string) => _get(`locations/${id}`),
};
