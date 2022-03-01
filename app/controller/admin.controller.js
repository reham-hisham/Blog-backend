const postModel = require("../../database/model/post.model");
const userModel = require("../../database/model/user.model");

class Admin {
  static showPendingPosts = async (req, res) => {
    try {
      const posts = await postModel.find({ articleStatus: "pending" });
      res.send({
        apiStatus: true,
        data: posts,
        message: "posts by type returned",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,  
        message: "couldn't get the pending posts",
      });
    }
  };
  static deletePost = async (req, res) => {
    try {
      const post = await postModel.findByIdAndDelete(req.params.id);
      if(!post) throw new Error("No post to delete");
      res.send({ apiStatus: true, data: post, message: "deleted" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't delete the post",
      });
    }
  };
  static deleteAcount = async (req, res) => {
    try {
      const account = await userModel.findByIdAndDelete(req.params.id);
      if(!account) throw new Error("No account to delete");
      res.send({
        apiStatus: true,
        data: account,
        message: "data deleted successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error deleting account",
      });
    }
  };
  static showAllViewers = async (req, res) => {
    try {
      const users = await userModel.find({ userRole: "viewer" });
      res.send({
        apiStatus: true,
        data: users,
        message: "users showed successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error showing users",
      });
    }
  };
  static showAllAdmins = async (req, res) => {
    try {
      const admins = await userModel.find({ userRole: "admin" });
      res.send({
        apiStatus: true,
        data: admins,
        message: "admins showed successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error showing admins",
      });
    }
  };
  static showAllEditors = async (req, res) => {
    try {
      const editors = await userModel.find({ userRole: "editor" });
      res.send({
        apiStatus: true,
        data: editors,
        message: "editors showed successfuly",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error showing editors",
      });
    }
  };
  static addAccount = async (req, res) => {
    try {
      const userData = new userModel(req.body);
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
        message: "error adding account",
      });
    }
  };
  static changePostStatus = async (req, res) => {
    try {
      const postData = await postModel.findByIdAndUpdate(
        req.params.id,
        {
          articleStatus: req.body.articleStatus,
        },
        { runValidators: true }
      );
      res.send({
        apiStatus: true,
        data: postData,
        message: "post status changed",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error changing post status",
      });
    }
  };
  static showAcceptedPosts = async (req, res) => {
    try {
      const posts = await postModel.findOne({ articleStatus: "accepted" });
      res.send({
        apiStatus: true,
        data: posts,
        message: "accepted posts showed",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error showing accepted posts",
      });
    }
  };
}
module.exports = Admin;
