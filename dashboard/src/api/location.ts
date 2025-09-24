import { AxiosResponse } from "axios";
import { _get, _post } from "./client";
import Location from "../interfaces/location.interface";
export type addLocationParams = {
  name: string;
  description: string;
};

export default {
  list: (token: string) =>
    _get("locations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  stats: (token: string) =>
    _get("locations/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  detail: (id: string, token: string) =>
    _get(`locations/location/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  add: (
    data: addLocationParams,
    token: string,
  ): Promise<AxiosResponse<Location>> =>
    _post("locations", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
