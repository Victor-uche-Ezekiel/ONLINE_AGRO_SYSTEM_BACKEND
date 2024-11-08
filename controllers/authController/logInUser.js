const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const customError = require("../../errors");
const { attachCookiesToResponse, createTokenUser } = require("../../utils");

const login = async (req, res) => {
  // - [] check if email and password exist, if one missing return 400
  const { email, password } = req.body;
  if (!email || !password)
    throw new customError.BadRequestError("please provide email and password");

  // - [] find user, if no user return 401
  const user = await User.findOne({ email });
  if (!user) {
    throw new customError.UnauthenticatedError(
      `Invalid Credentials, no user with ${email}`
    );
  }
  // - [] check password, if does not match return 401
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new customError.UnauthenticatedError("Invalid Credentials");

  // - [] if everything is correct, attach cookie
  //   and send back the same response as in register};

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

module.exports = login;
