const Product = require("../../models/product");
const AddToCart = require("../../models/cartProduct");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");

const createCartProduct = async (req, res) => {
  const { id: productId } = req.body;
  const { userId } = req.user;

  const isProductInCart = await AddToCart.findOne({ productId });

  if (!productId) {
    throw new CustomError.BadRequestError("Product Id is required");
  }

  if (isProductInCart) {
    throw new CustomError.BadRequestError("Product already exists in cart");
  } else {
    const isProduct = await Product.findOne({ _id: productId });
    if (!isProduct) {
      throw new CustomError.NotFoundError("Product does not exist");
    }
  }

  const payload = {
    product: productId,
    quantity: 1,
    userId,
  };

  const newAddToCartProduct = new AddToCart(payload);
  const saveProduct = await newAddToCartProduct.save();

  return res.status(StatusCodes.CREATED).json({
    data: saveProduct,
    message: "Product Added to Cart",
  });
};

module.exports = createCartProduct;
