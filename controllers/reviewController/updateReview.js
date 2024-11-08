const Review = require("../../models/review");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const { checkPermissions } = require("../../utils");

const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }
  checkPermissions(req.user, review.user);

  const { rating, title, comment } = req.body;

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res
    .status(StatusCodes.OK)
    .json({ message: "Review updated successfully", review });
};

module.exports = updateReview;
