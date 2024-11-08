const Review = require("../../models/review");
const { StatusCodes } = require("http-status-codes");

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = getSingleProductReviews;
