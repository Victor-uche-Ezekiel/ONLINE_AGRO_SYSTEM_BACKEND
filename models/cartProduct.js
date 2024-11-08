const mongoose = require("mongoose");

const addToCart = new mongoose.Schema(
  {
    product: {
      ref: "Product",
      type: String,
    },
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.AddToCart || mongoose.model("AddToCart", addToCart);
