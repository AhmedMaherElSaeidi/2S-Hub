// Fake res.users. "groups" mimics the Odoo security groups a real user
// would carry — the app checks for "base.group_user" to decide whether
// to show the Sales Orders screen.
module.exports = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    name: "Aya El Hadad",
    groups: ["base.group_user"], // internal user -> sees Sales Orders
    token: "mock-token-admin",
  },
  {
    id: 2,
    username: "sales",
    password: "sales",
    name: "Eyad Salem",
    groups: [], // portal/external user -> no Sales Orders access
    token: "mock-token-sales",
  },
];
