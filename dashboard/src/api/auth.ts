import { _post } from "./client";
export default {
  login: (email: string, password: string) =>
    _post(`/auth/login`, { email, password }),
};
