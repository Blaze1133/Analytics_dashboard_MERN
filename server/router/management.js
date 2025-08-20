const express = require("express");
const router = express.Router();
const { getAdmins, getUserPerformance } = require("../controller/management");

router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);
module.exports = router;
