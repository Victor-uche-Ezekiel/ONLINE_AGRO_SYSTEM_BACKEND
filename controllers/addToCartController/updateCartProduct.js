const AddToCart = require("../../models/cartProduct");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");

const updateCartProduct = async (req, res) => {
  const { userId } = req.user;

  const { id: productId } = req.body;

  const qty = req.body.quantity;

  const cartProduct = await AddToCart.findOne({
    productId,
    userId,
  });

  if (!cartProduct) {
    throw new CustomError.NotFoundError("Product does not exist in Your cart");
  }

  cartProduct.quantity = qty;
  await cartProduct.save();

  return res.status(StatusCodes.OK).json({
    message: "Product Updated",
    data: cartProduct,
    error: false,
    success: true,
  });
};

module.exports = updateCartProduct;
