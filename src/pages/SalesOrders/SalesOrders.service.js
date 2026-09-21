import { listSalesOrders } from "../../controller/salesOrder.controller";

export const loadSalesOrders = async () => {
  return listSalesOrders();
};
