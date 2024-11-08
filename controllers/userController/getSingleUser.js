const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const CustomError = require("../../errors");
const { checkPermissions } = require("../../utils");

const getSingleUser = async (req, res) => {
  console.log(req.params.id, "seeeeeeeeeeee");
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`no user with id ${req.params.id}`);
  }

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ msg: "found user", user });
};

module.exports = getSingleUser;
