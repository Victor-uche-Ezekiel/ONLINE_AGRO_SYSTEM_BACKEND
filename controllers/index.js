const createCartProduct = require("./addToCartController/createCartProduct");
const deleteCartProduct = require("./addToCartController/deleteCartProduct");
const getCartProducts = require("./addToCartController/getCartProducts");
const updateCartProduct = require("./addToCartController/updateCartProduct");
const login = require("./authController/logInUser");
const logOut = require("./authController/logOutUser");
const register = require("./authController/registerUser");
const createOrder = require("./orderController/createOrder");
const createProduct = require("./productController/createProduct");
const deleteProduct = require("./productController/deleteProduct");
const featuredProducts = require("./productController/featuredProduct");
const getAllProducts = require("./productController/getAllProducts");
const getSingleProduct = require("./productController/getSingleProduct");
const updateProduct = require("./productController/updateProduct");
const uploadImage = require("./productController/uploadImage");
const createReview = require("./reviewController/createReview");
const deleteReview = require("./reviewController/deleteReview");
const getAllReviews = require("./reviewController/getAllReviews");
const getSingleProductReviews = require("./reviewController/getSingleProductReview");
const getSingleReview = require("./reviewController/getSingleReview");
const updateReview = require("./reviewController/updateReview");
const deleteCurrentUser = require("./userController/deleteCurrentUser");
const deleteUser = require("./userController/deleteUser");
const getAllUsers = require("./userController/getAllUsers");
const getSingleUser = require("./userController/getSingleUser");
const showCurrentUser = require("./userController/showCurrentUser");
const updateRole = require("./userController/updateRole");
const updateUser = require("./userController/updateUser");
const updateUserPassword = require("./userController/updateUserPassword");

module.exports = {
  createCartProduct,
  getCartProducts,
  updateCartProduct,
  deleteCartProduct,

  register,
  login,
  logOut,

  createOrder,

  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  uploadImage,
  featuredProducts,

  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,

  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  updateRole,
  deleteCurrentUser,
  deleteUser,
};
