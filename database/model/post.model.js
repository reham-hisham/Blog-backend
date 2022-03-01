const mongoose = require("mongoose");
const { none } = require("../../middleware/uploadImage");

const postSchema = mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    articleType: {
      type: String,
      enum: ["sports", "cinema", "politics", "religion"],
      required: true,
    },
    articleStatus: {
      type: String,
      enum: ["accepted", "pending", "refused"],
      default: "pending",
    },
    image: {
      type: String,
    },
    numberOfViewers: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,

          require: true,
        },
      },
    ],
    numberOfLikes: {
      type: Number,
      default: 0,
      min: 0,
    },
    comments: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timeStamp: true }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
