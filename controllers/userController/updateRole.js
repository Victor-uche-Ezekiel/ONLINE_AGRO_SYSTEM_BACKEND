const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const CustomError = require("../../errors");

const updateRole = async (req, res) => {
  const { role, email } = req.body;
  if (!role || !email)
    throw new CustomError.BadRequestError("Please Provide both Values");

  const user = await User.findOne({ email });
  if (!user) throw new CustomError.NotFoundError(`No user with email ${email}`);

  user.role = role;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "updated role successfully" });
};

module.exports = updateRole;
