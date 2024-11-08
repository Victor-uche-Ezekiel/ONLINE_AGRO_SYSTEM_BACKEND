const Review = require("../../models/review");
const { StatusCodes } = require("http-status-codes");

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

module.exports = getAllReviews;
