const AddToCart = require("../../models/cartProduct");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");

const getCartProducts = async (req, res) => {
  const { userId } = req.user;
  const cartProducts = await AddToCart.find({ userId }).populate("product");

  if (!cartProducts) {
    throw new CustomError.NotFoundError("Cart Product not found");
  }
  return res.status(StatusCodes.OK).json({
    cartProducts,
    message: "Cart Product",
  });
};

module.exports = getCartProducts;
