const mongoose = require("mongoose");
const user = require("./user");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please provide review rating"],
      default: 0,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
      // validate: {
      //     validator: Number.isInteger,
      //     message: "{VALUE} is not an integer value",
      // }
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxlength: [100, "Title can not be more than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please provide review comment"],
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await mongoose.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

let proId;
ReviewSchema.post("save", async function () {
  proId = this.product;
  await mongoose.model("Review").calculateAverageRating(this.product);
});

ReviewSchema.post("deleteOne", async function () {
  await mongoose.model("Review").calculateAverageRating(proId);
});

module.exports = mongoose.model("Review", ReviewSchema);
