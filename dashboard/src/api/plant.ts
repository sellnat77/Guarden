import { _get } from "./client";
export default {
  list: (id: string) => _get(`plants/location/${id}`),
  detail: (id: string) => _get(`plants/plant/${id}`),
};
