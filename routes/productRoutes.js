const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  uploadImage,
  featuredProducts,
  getSingleProductReviews,
} = require("../controllers");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createProduct)
  .get(getAllProducts);
// .get(featuredProducts);

router.route("/featuredProducts").get(featuredProducts);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermissions("admin")], uploadImage);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions("admin")], updateProduct)
  .delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

router.route("/:id/reviews").get(getSingleProductReviews);

module.exports = router;
