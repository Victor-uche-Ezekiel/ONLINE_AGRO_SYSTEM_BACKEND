const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const CustomError = require("../../errors");
const { createTokenUser, attachCookiesToResponse } = require("../../utils");

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    throw new CustomError.BadRequestError("please provide name and email");

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  // const tokenUser = {name:user.name,role:user.role,userId:user.id}

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

module.exports = updateUser;
