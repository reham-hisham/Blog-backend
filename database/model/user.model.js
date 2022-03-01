const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let regex = new RegExp(
  /^(?!.\s)(?=.[A-Z])(?=.[a-z])(?=.[0-9])(?=.[~`!@#$%^&()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/
);

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 15,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 15,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(val) {
        if (!validator.isEmail(val)) throw new Error("Invalid email");
      },
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    otp: {
      type: String,
    },
    userRole: {
      type: String,
      enum: ["viewer", "editor", "admin"],
      required: true,
    },
    likedPosts:{
      postid:{
        
      }
    },
    isVerified: { type: Boolean, default: false },
    tokens: [
      {
        token: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timeStamp: true }
);
// encrypt password , 8=> random number could be any number between  1 ~10
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});
userSchema.statics.login = async function (email, password) {
  // user pasword and email
  const userData = await user.findOne({ email });

  //check user email
  if (!userData) {
    throw new Error("invalid Email");
  }

  // check user password
  const validPassword = await bcrypt.compare(password, userData.password);
  if (!validPassword) {
    throw new Error("invalid password");
  }
  // return user data if valid login
  return userData;
};
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.jwtKey);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
const user = mongoose.model("user", userSchema);
module.exports = user;
