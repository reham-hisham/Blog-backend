const userModel = require("../../database/model/user.model");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const otp = require("../../helper/otpGenerator");
const sendEmail = require("../../helper/sendEmail");
class User {
  static register = async (req, res) => {
    try {
      const userOTP = otp(6);
      const userData = new userModel(req.body);
      if (userData.userRole == "admin")
        throw new Error("Only admins can add admins");
      sendEmail(
        userData.email,
        `your OTP is ${userOTP} pless activate your account`,
        "Press Agency",
        "Welcom"
      );
      userData.otp = userOTP;
      await userData.generateToken();
      await userData.save();
      res.send({
        apiStatus: true,
        data: userData,
        message: "added",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error adding user",
      });
    }
  };

  static login = async (req, res) => {
    try {
      const userData = await userModel.login(req.body.email, req.body.password);
      if (userData.otp) {
        throw new Error("Pless activate your account first");
      }
      const token = await userData.generateToken();
      res.send({
        apiStatus: true,
        message: "logged in",
        data: { userData, token },
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "failed",
      });
    }
  };
  static singleUser = async (req, res) => {
    res.send({ apiStatus: true, data: req.user, message: "data featched" });
  };

  static logout = async (req, res) => {
    // remove token
    try {
      req.user.tokens = req.user.tokens.filter((tok) => req.token != tok.token);
      await req.user.save();
      res.send({
        apiStatus: true,
        message: "logged out",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "failed loggout ",
      });
    }
  };

  static deleteSingleAcount = async (req, res) => {
    try {
      const user = await userModel.deleteOne({ id: req.user._id });
      res.send({
        apiStatus: true,
        data: user,
        message: "data deleted successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error deleting user",
      });
    }
  };
  static edit = async (req, res) => {
    try {
      //recrypt the password again
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
      }
      const userUpdated = await userModel.updateOne(
        { id: req.user._id },
        req.body,
        { upsert: false, runValidators: true }
      );
      res.send({
        apiStatus: true,
        data: userUpdated,
        message: "updates",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        message: e.message,
      });
    }
  };

  static uploadProfileImage = async (req, res) => {
    try {
      req.user.image = req.file.destination;
      await req.user.save();
      res.send({
        apiStatus: true,
        data: req.user,
      });
    } catch (e) {
      res.send({
        apiStatus: false,
      });
    }
  };

  static activateAccount = async (req, res) => {
    try {
  
      if (!req.user.otp) {
        throw new Error("User already varifaed");
      } else if (req.user.otp == req.body.otp) {
        req.user.isVerified = true;
        req.user.otp = null;
        req.user.tokens = req.user.tokens.filter(
          (tok) => req.token != tok.token
        );
        await req.user.save();
        res.send({
          apiStatus: true,
          data: req.user,
        });
      } else {
        throw new Error("invalid OTP");
      }
    } catch (e) {
      res.send({
        apiStatus: false,
        message: e.message,
      });
    }
  };
 
}
module.exports = User;
