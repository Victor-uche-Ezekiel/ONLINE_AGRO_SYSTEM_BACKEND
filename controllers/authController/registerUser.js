const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const customError = require("../../errors");
const { attachCookiesToResponse, createTokenUser } = require("../../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const isEmailAlreadExist = await User.findOne({ email });

  // check if email already exist
  if (isEmailAlreadExist) {
    throw new customError.BadRequestError(
      "email already in use, please provide a different one"
    );
  }

  // make first registered user to be an admin

  // const isFirstAccount = (await User.countDocuments({})) === 0;
  // const role = isFirstAccount ? "admin" : "user";

  const role = email === "victor@gmail.com" ? "admin" : "user";

  const user = await User.create({ email, name, password, role });

  // const { userToken, token } = await user.createToken();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

module.exports = register;
