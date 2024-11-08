const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserShema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please provide name"],
    minlength: 6,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    require: [true, "please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide valid email",
    },
  },
  password: {
    type: String,
    require: [true, "please provide password"],
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserShema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserShema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserShema.pre("deleteOne", async function () {
  const userId = await this._conditions._id.toString();

  await mongoose.model("Review").deleteMany({
    userId,
  });
});

UserShema.pre("deleteOne", async function () {
  const userId = await this._conditions._id.toString();

  await mongoose.model("AddToCart").deleteMany({
    userId,
  });
});

UserShema.pre("deleteOne", async function () {
  const userId = await this._conditions._id.toString();

  await mongoose.model("Order").deleteMany({
    userId,
  });
});

// UserShema.methods.createToken = async function () {
//   const userToken = {
//     name: this.name,
//     id: this._id,
//     role: this.role,
//   };
//   const token = jwt.sign(userToken, "jwtSecret", { expiresIn: "1d" });
//   return { userToken, token };
// };

module.exports = mongoose.model("User", UserShema);
