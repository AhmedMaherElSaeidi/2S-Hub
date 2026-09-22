const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  list,
  getById,
  update,
} = require("../controllers/customers.controller");

const router = express.Router();

router.use(requireAuth);

router.get("/", list);
router.get("/:id", getById);
router.put("/:id", update);

module.exports = router;
