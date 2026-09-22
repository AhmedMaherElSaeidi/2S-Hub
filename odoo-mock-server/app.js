const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const customersRoutes = require("./routes/customers.routes");
const salesOrdersRoutes = require("./routes/salesOrders.routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // logs e.g. "POST /auth/login 200 4.123 ms - 87"

app.use("/auth", authRoutes);
app.use("/customers", customersRoutes);
app.use("/sales-orders", salesOrdersRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
