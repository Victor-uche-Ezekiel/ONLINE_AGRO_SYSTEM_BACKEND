require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const connectDB = require("./db/connect");

//routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const AddToCartRouter = require("./routes/addToCartRoutes");

// middleWares
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies);
  res.json("<h1>home Page</h1>");
});

app.get("/", (req, res) => {
  res.json("<h1>home Page</h1>");
});

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);

// app.use("/api/v1/products", productRouter);

app.use("/api/v1/products", productRouter);

app.use("/api/v1/reviews", reviewRouter);

app.use("/api/v1/orders", orderRouter);

app.use("/api/v1/addtocart", AddToCartRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    throw error;
    console.log(error);
  }
};

start();
