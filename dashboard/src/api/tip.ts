import { _get } from "./client";
export default {
  random: () => _get(`tips/random`),
};
