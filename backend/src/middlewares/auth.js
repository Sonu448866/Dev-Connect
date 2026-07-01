const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //Read the token from the req cookies
  //Validate the token
  //Find the user
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login");
    }
    const decodedObj = await jwt.verify(token, "DEV@TINDER#@#$%");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not Found");
    } else {
      req.user = user; //attaching user data to req object
      next();
    }
  } catch (error) {
    // res.status(400).send("ERROR:" + error.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  userAuth: userAuth,
};
