const CustomError = require("../errors");
const { isTokenValid } = require("../utils");
const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { role, userId, name } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    console.log(req.user.role, "role of the user");

    if (!roles.includes(req.user.role))
      throw new CustomError.UnauthorizedError(
        "Not Unauthorized to access this route"
      );
    next();
  };
};

const authorizeRolePermission = (email) => {
  return async (req, res, next) => {
    const { role, userId } = req.user;

    const user = await User.findOne({ _id: userId });

    if (user.email !== email)
      throw new CustomError.UnauthorizedError(
        "Not Unauthorized to access this route"
      );
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
  authorizeRolePermission,
};
