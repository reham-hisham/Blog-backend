const postModel = require("../../database/model/post.model");
const { post } = require("../../routes/admin.routes");

class Post {
  static findPostsByTitle = async (req, res) => {
    try {
      const post = await postModel.find({
        title: req.body.title,
        articleStatus: "accepted",
      });
      console.log(post);
      res.send({
        apiStatus: true,
        data: post,
        message: "post by title returned",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't get the post by title",
      });
    }
  };
  static findPostsByType = async (req, res) => {
    try {
      const posts = await postModel.find({
        articleType: req.body.articleType,
        articleStatus: "accepted",
      });
      res.send({
        apiStatus: true,
        data: posts,
        message: "posts by type returned",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't get the posts by type",
      });
    }
  };
  static addComment = async (req, res) => {
    try {
      const posts = await postModel.find({
        _id: req.params.id,
      });
      posts[0].comments.push({
        userID: req.user._id,
        content: req.body.comment,
      });
      posts[0].save();
      res.send({
        apiStatus: true,
        data: posts,
        message: "comment added",
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        message: e.message,
      });
    }
  };
  static addlike = async (req, res) => {
    try {
      //get post data
      const post = await postModel.findById(req.params.id);

      const liked = post.likes.findIndex((like) =>
        like.userID.equals(req.user._id)
      );
      if (liked > -1) {
        post.likes.splice(liked, 1);
        if (post.numberOfLikes != 0) {
          post.numberOfLikes = post.numberOfLikes - 1;
        }
      } else {
        post.likes.push({
          userID: req.user._id,
        });
        post.numberOfLikes = post.numberOfLikes + 1;
      }

      await post.save();

      res.send({
        apiStatus: true,
        data: post,
      });
    } catch (e) {
      res.send({
        apiStatus: false,
        message: e.message,
      });
    }
  };
  static showPost = async (req, res) => {
    try {
      const posts = await postModel.findOne({
        _id: req.params.id,
        articleStatus: "accepted",
      });

      if (posts) {
        posts.numberOfViewers++;
        posts.save();
        res.send({
          apiStatus: true,
          data: posts,
          message: "post returned",
        });
      }else{
        throw new Error("Post not accepted")
      }
    } catch (e) {
      res.send({
        apiStatus: false,
        data: e.message,
        message: "couldn't get the post",
      });
    }
  };
}
// add comment, increament (number of viewers, number of )
module.exports = Post;
