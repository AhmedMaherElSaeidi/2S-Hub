import {
  getCustomer,
  updateCustomerPhone,
} from "../../controller/customer.controller";

export const loadCustomer = async (id) => {
  return getCustomer(id);
};

export const saveCustomerPhone = async (id, phone) => {
  return updateCustomerPhone(id, phone);
};
