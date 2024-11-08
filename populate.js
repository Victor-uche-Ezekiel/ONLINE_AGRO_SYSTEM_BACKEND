require("dotenv").config();

const connectDB = require("./db/connect");
const User = require("./models/user");

// const jsonProducts = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await User.deleteMany();
    // await Product.create(jsonProducts)
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    throw error;
    process.exit(1);
  }
};

start();
