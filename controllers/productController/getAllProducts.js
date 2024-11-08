const { StatusCodes } = require("http-status-codes");
const Product = require("../../models/product");
const { E, N, R, B, A, sortAndFilterAllProducts } = require("../../utils/lib");

const getAllProducts = async (req, res) => {
  const { newPageValue, productsPerPage, findProducts, getSorted } =
    sortAndFilterAllProducts(req);

  const products = await Product.find(findProducts)
    .skip((newPageValue - 1) * productsPerPage)
    .limit(productsPerPage)
    .sort(getSorted);

  const count = await Product.find(findProducts)
    .sort(getSorted)
    .countDocuments();

  res.status(StatusCodes.OK).json({ products, count });
};

module.exports = getAllProducts;
