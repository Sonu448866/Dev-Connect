const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const validator = require("validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

const authRouter = express.Router();

//there is almost no difference when we use app.use() or authRouter.use() ,just it makes code more modular
//signup api
authRouter.post("/signup", async (req, res) => {
  try {
    //initial validation of data
    validateSignUpData(req);
    //taking data from body
    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      age,
      photoUrl,
      about,
      skills,
    } = req.body;
    //encrypting using bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    const userObj = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passwordHash,
      age: age,
      gender: gender,
      photoUrl: photoUrl,
      about: about,
      skills: skills,
    };

    //creating a new instance of the User Model
    const user = new User(userObj);
    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    // res.status(400).send("Error saving the user:" + err.message);
    res.status(400).json({
      message: err.message,
    });
  }
});

//login api
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not valid");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.status(200).json({ message: `Login Successfully`, data: user });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    // res.status(400).send("Something went Wrong::" + err.message);
    res.status(400).json({
      message: err.message,
    });
  }
});

//logout Api
authRouter.post("/logout", userAuth, async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "Logout Successfull" });
});

module.exports = authRouter;
