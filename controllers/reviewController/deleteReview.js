const Review = require("../../models/review");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const { checkPermissions } = require("../../utils");

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
  }
  checkPermissions(req.user, review.user);

  await review.deleteOne();

  res.status(StatusCodes.OK).json({ message: "Review deleted successfully" });
};

module.exports = deleteReview;
