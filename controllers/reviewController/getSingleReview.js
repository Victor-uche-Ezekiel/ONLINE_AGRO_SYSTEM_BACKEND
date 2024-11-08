const Review = require("../../models/review");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");

const getSingleReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(
      `No review with id ${req.params.reviewId}`
    );
  }
  res.status(StatusCodes.OK).json({ review });
};

module.exports = getSingleReview;
