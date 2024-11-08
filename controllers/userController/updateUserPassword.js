const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const CustomError = require("../../errors");

const updateUserPassword = async (req, res) => {
  const { oldPasssword, newPassword } = req.body;

  if (!oldPasssword || !newPassword)
    throw new CustomError.BadRequestError("Please Provide both Values");

  const user = await User.findOne({ _id: req.user.userId });

  const isValidOldPassword = user.comparePassword(oldPasssword);

  if (!isValidOldPassword)
    throw new CustomError.UnauthenticatedError("Invalid Credentials");

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "updated password successfully" });
};

module.exports = updateUserPassword;
