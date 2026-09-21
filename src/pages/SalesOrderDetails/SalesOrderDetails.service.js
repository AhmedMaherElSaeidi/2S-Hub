import {
  getSalesOrder,
  confirmSalesOrder,
} from "../../controller/salesOrder.controller";

export const loadSalesOrder = async (id) => {
  return getSalesOrder(id);
};

export const confirmOrder = async (id) => {
  return confirmSalesOrder(id);
};
