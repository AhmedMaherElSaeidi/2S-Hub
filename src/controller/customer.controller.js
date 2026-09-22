import * as services from "../services";
 
const RESOURCE = "customers";
 
const isCustomer = (partner) => (partner.customer_rank ?? 0) > 0;
 
export const listCustomers = async (search = "") => {
  const partners = await services.get(RESOURCE, search ? { search } : {});

  return partners.filter(isCustomer);
};
 
export const getCustomer = (id) => services.getById(RESOURCE, id);
 
export const updateCustomer = (id, data) => services.put(RESOURCE, id, data);
 
export const updateCustomerPhone = (id, phone) =>
  services.put(RESOURCE, id, { phone });
 