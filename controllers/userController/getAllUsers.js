const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ msg: "found users", users });
};

module.exports = getAllUsers;
