const express = require("express");
const router = express.Router();

const { getSales } = require("../controller/sales");

router.get("/sales", getSales);

module.exports = router;
