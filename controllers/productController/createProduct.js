const { StatusCodes } = require("http-status-codes");
const Product = require("../../models/product");

const createProduct = async (req, res) => {
  console.log(req.user);

  const user = req.user.userId;
  const { name, price, image, colors, company, description, category } =
    req.body;

  if (
    !name ||
    !price ||
    !company ||
    !description ||
    !category ||
    // !image ||
    !colors
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide all required fields" });
  }

  const product = await Product.create({
    name,
    price,
    image,
    colors,
    company,
    description,
    category,
    user,
  });

  res.status(StatusCodes.CREATED).json({ product, message: "Product Created" });
};

module.exports = createProduct;
