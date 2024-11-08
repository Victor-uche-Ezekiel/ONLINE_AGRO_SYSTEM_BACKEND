const { StatusCodes } = require("http-status-codes");
const Product = require("../../models/product");
const CustomError = require("../../errors/");

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId }).populate("reviews");

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

module.exports = getSingleProduct;
