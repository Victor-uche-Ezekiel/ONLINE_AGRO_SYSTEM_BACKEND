const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors/");
const path = require("path");

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("Please upload an image file");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload an image file");
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload an image file less than 1MB"
    );
  }

  const imagePath = path.join(
    __dirname,
    "../../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({
    image: `/uploads/${productImage.name}`,
    msg: "Image uploaded successfully",
  });
};

module.exports = uploadImage;
