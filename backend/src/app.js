const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

//const { userAuth } = require("./middlewares/auth");
const app = express();

// app.use((req, res, next) => {
//   console.log("Incoming:", req.method, req.url);
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

//middleware (converts JSON obj to Javascript Obj)
app.use(express.json());
//middleware for accessing browser cookie
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//ensures that database connection is established before starting the server
connectDB()
  .then(async () => {
    console.log("Database Connection Successful");
    await User.syncIndexes();
    app.listen(3000, () => {
      console.log("Server is running on PORT 3000");
    });
  })
  .catch((err) => {
    console.log(`Database Connection Fails:${err}`);
  });
