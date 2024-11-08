const { StatusCodes } = require("http-status-codes");
const Product = require("../../models/product");

const featuredProducts = async (req, res) => {
  const products = await Product.aggregate([
    // { $match: { price: 13000 } },
    { $sample: { size: 6 } },
  ]);

  res.status(StatusCodes.OK).json({ products });
};

module.exports = featuredProducts;
