const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  createCartProduct,
  updateCartProduct,
  deleteCartProduct,
  getCartProducts,
} = require("../controllers");

router
  .route("/")
  .post(authenticateUser, createCartProduct)
  .get(authenticateUser, getCartProducts);
router.route("/update").patch(authenticateUser, updateCartProduct);
router.route("/delete").delete(authenticateUser, deleteCartProduct);

module.exports = router;
