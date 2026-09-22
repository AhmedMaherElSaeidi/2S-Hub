const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  list,
  getById,
  confirm,
} = require("../controllers/salesOrders.controller");

const router = express.Router();

router.use(requireAuth);

router.get("/", list);
router.get("/:id", getById);
router.post("/:id/confirm", confirm);

module.exports = router;
