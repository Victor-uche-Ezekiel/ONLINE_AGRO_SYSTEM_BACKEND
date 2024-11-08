const { StatusCodes } = require("http-status-codes");
const Product = require("../../models/product");
const CustomError = require("../../errors/");

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id ${productId}`);
  }

  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Product removed" });
};

module.exports = deleteProduct;
