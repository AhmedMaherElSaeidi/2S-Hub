import * as services from "../services";

const RESOURCE = "customers";

// CRUD for customers (res.partner), built on top of services.js's generic
// verbs. Only the operations this app needs are implemented — add
// createCustomer / deleteCustomer here if a future screen needs them.

export const listCustomers = (search = "") =>
  services.get(RESOURCE, search ? { search } : {});

export const getCustomer = (id) => services.getById(RESOURCE, id);

export const updateCustomer = (id, data) => services.put(RESOURCE, id, data);

export const updateCustomerPhone = (id, phone) =>
  services.put(RESOURCE, id, { phone });
