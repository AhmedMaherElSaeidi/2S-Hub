import { listCustomers } from "../../controller/customer.controller";

export const loadCustomers = async (search = "") => {
  return listCustomers(search);
};
