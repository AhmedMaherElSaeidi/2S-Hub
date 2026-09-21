import { login } from "../../controller/auth.controller";

export const loginUser = async (username, password) => {
  return login(username, password);
};
