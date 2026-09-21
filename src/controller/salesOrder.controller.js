import * as services from "../services";

const RESOURCE = "sales-orders";

// CRUD (+ confirm action) for sales orders, built on services.js's
// generic verbs. "Confirm" isn't a standard CRUD verb, but it lives here
// for the same reason: everything about this object's lifecycle stays in
// one file.

export const listSalesOrders = () => services.get(RESOURCE);

export const getSalesOrder = (id) => services.getById(RESOURCE, id);

export const confirmSalesOrder = (id) =>
  services.post(`${RESOURCE}/${id}/confirm`);
