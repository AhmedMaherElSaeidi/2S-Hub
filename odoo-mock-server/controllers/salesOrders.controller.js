const salesOrders = require("../data/salesOrders");

const list = (req, res) => {
  res.json(salesOrders);
};

const getById = (req, res) => {
  const order = salesOrders.find((o) => o.id === Number(req.params.id));

  if (!order) {
    return res.status(404).json({ message: "Sales order not found" });
  }

  res.json(order);
};

const confirm = (req, res) => {
  const order = salesOrders.find((o) => o.id === Number(req.params.id));

  if (!order) {
    return res.status(404).json({ message: "Sales order not found" });
  }

  order.status = "confirmed";
  res.json(order);
};

module.exports = { list, getById, confirm };
