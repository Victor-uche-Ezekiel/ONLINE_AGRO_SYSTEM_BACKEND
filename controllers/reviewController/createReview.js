const Review = require("../../models/review");
const Product = require("../../models/product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");

const createReview = async (req, res) => {
  const { product: productId, rating, comment, title } = req.body;
  userId = req.user.userId;

  if (!productId || !rating || !comment || !title) {
    throw new CustomError.BadRequestError("All fields are required");
  }

  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    productId: productId,
    userId: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      `You have already submitted a review for this product`
    );
  }

  const review = await Review.create({
    productId,
    comment,
    title,
    rating,
    userId,
  });
  res.status(StatusCodes.CREATED).json({ review });
};

module.exports = createReview;
