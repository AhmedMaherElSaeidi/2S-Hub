const customers = require("../data/customers");

const list = (req, res) => {
  const search = (req.query.search || "").toLowerCase();

  const results = search
    ? customers.filter((c) => c.name.toLowerCase().includes(search))
    : customers;

  res.json(results);
};

const getById = (req, res) => {
  const customer = customers.find((c) => c.id === Number(req.params.id));

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json(customer);
};

const update = (req, res) => {
  const customer = customers.find((c) => c.id === Number(req.params.id));

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  Object.assign(customer, req.body);
  res.json(customer);
};

module.exports = { list, getById, update };
