const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Not a strong Password");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 110,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
      //custom validation function
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    photoUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369989.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user",
      validate(value) {
        if (!validator.isLength(value, { min: 5, max: 300 })) {
          throw new Error("About message is too long");
        }
      },
    },
    skills: {
      type: [String],
      validate: {
        validator: function (skills) {
          // Array length validation
          if (skills.length > 10) return false;

          // Validate each skill string
          return skills.every((skill) =>
            validator.isLength(skill, { min: 2, max: 20 }),
          );
        },
        message:
          "Skills can contain at most 10 items and each skill must be between 2 and 20 characters.",
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  //use normal function
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@TINDER#@#$%", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
