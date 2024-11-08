const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const { createOrder } = require("../controllers");

router.route("/").post(authenticateUser, createOrder);

module.exports = router;
