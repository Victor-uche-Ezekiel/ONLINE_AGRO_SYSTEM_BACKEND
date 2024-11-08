const AddToCart = require("../../models/cartProduct");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");

const deleteCartProduct = async (req, res) => {
  const { userId } = req.user;
  const { id: productId } = req.body;

  const cartProduct = await AddToCart.findOne({
    _id: productId,
    userId,
  });

  if (!cartProduct) {
    throw new CustomError.NotFoundError("Product does not exist in Your cart");
  }

  await cartProduct.deleteOne();

  return res.status(StatusCodes.OK).json({
    message: "Product Deleted From Cart",
    error: false,
    success: true,
    data: cartProduct,
  });
};

module.exports = deleteCartProduct;
