const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = require("./auth");
const User = require("../models/user");
const profileRouter = express.Router();

authRouter.use(express.json());

//get Profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ data: user });
  } catch (err) {
    // res.status(400).send("ERROR:" + err.message);
    res.status(400).json({
      message: err.message,
    });
  }
});

//profile update api's
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    //res.status(400).send("Something went Wrong" + err.message);
    res.status(400).json({
      message: err.message,
    });
  }
});

//profile password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const password = req.body.password;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(req.user._id, {
      password: passwordHash,
    });
    res.status(200).json({ message: "Password is changed successfully" });
  } catch (err) {
    // res.status(400).json({
    //   message: "Password didn't change",
    //   error: err.message,
    // });
    res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = profileRouter;
