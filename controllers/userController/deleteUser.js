const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const CustomError = require("../../errors");
const { removeCookiesFromResponse } = require("../../utils/jwt");

const deleteUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user)
    throw new CustomError.NotFoundError(`No user with id ${req.params.id}`);
  await user.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "deleted user successfully" });
};

module.exports = deleteUser;
