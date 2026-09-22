// Fake sale.order records. "status" values used by the app:
// "draft" | "quotation" -> can be confirmed, "confirmed" -> already done.
module.exports = [
  {
    id: 501,
    order_number: "S00001",
    customer: "Mostafa Textiles",
    order_date: "2026-09-18",
    status: "draft",
    total: 4250.0,
    products: [
      { id: 1, name: "Cotton Bedsheet Set", quantity: 20, price: 120 },
      { id: 2, name: "Pillow Case (Pair)", quantity: 30, price: 35 },
    ],
  },
  {
    id: 502,
    order_number: "S00002",
    customer: "Nour Home Decor",
    order_date: "2026-09-19",
    status: "quotation",
    total: 1800.0,
    products: [{ id: 3, name: "Duvet Cover", quantity: 12, price: 150 }],
  },
  {
    id: 503,
    order_number: "S00003",
    customer: "Cairo Fabrics Co.",
    order_date: "2026-09-15",
    status: "confirmed",
    total: 9600.0,
    products: [
      { id: 4, name: "Curtain Fabric (m)", quantity: 200, price: 40 },
      { id: 5, name: "Tieback Set", quantity: 40, price: 40 },
    ],
  },
  {
    id: 504,
    order_number: "S00004",
    customer: "Delta Linens",
    order_date: "2026-09-20",
    status: "draft",
    total: 3120.0,
    products: [{ id: 6, name: "Towel Set", quantity: 24, price: 130 }],
  },
];
