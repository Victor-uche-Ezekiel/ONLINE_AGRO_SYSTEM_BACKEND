const { StatusCodes } = require("http-status-codes");
const { removeCookiesFromResponse } = require("../../utils/jwt");

const logOut = async (req, res, next) => {
  removeCookiesFromResponse(res);
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = logOut;
