const postModel = require("../../database/model/post.model");

class Editor {
  static addPost = async (req, res) => {
    try {
      const post = new postModel({ authorId: req.user._id, ...req.body });
      await post.save();
      res.send({ apiStatus: true, data: post, message: "added" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't add the post",
      });
    }
  };
  static allEditorPosts = async (req, res) => {
    try {
      const posts = await postModel.find({ authorId: req.user._id });
      res.send({ apiStatus: true, data: posts, message: "returned" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't get the posts",
      });
    }
  };
  static updatePost = async (req, res) => {
    try {
      const post = await postModel.findOneAndUpdate(
        {
          authorId: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { upsert: false, runValidators: true }
      );

      res.send({ apiStatus: true, data: post, message: "edited" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't edit the post",
      });
    }
  };
  static deletePost = async (req, res) => {
    try {
      const post = await postModel.findOneAndDelete({
        authorId: req.user._id,
        _id: req.params.id,
      });
      res.send({ apiStatus: true, data: post, message: "deleted" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't delete the post",
      });
    }
  };
  static uploadPostImage = async (req, res) => {
    try {
      const post = await postModel.findOneAndUpdate(
        {
          authorId: req.user._id,
          _id: req.params.id,
        },
        { image: req.file.path },
        { upsert: false, runValidators: true }
      );
      if(!post){
        throw new Error ("its not your post")
      }

      await post.save();

      res.send({ apiStatus: true, data: req.post, message: "image uploaded" });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "error deleting user",
      });
    }
  };
}

module.exports = Editor;
