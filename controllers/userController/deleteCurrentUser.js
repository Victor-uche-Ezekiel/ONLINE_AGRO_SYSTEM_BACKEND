const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const CustomError = require("../../errors");

const deleteCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user)
    throw new CustomError.NotFoundError(`No user with id ${req.user.userId}`);

  removeCookiesFromResponse(res);
  await user.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "deleted user successfully" });
};

module.exports = deleteCurrentUser;
