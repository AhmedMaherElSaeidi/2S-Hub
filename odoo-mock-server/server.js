const app = require("./app");

const PORT = 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Mock Odoo server running at http://localhost:${PORT}`);
  console.log(`Test users -> admin/admin (internal), sales/sales (portal)`);
});
