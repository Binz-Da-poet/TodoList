const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route POST
// @desc Create post
// @access private

router.post("/", verifyToken, async (req, res) => {
  const { title, decription, url, status } = req.body;

  if (!title)
    return res
      .status(404)
      .json({ success: false, message: "Title is required" });
  try {
    const newPost = new Post({
      title,
      decription,
      url: url.startsWith("http://") ? url : `http://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();

    res.json({ success: true, message: "Happy learning!", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @route GET
// @desc Get posts
// @access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @route PUT
// @desc update post
// @access private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  //Simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https//") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    const postUpdateConditional = { _id: req.params.id, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateConditional,
      updatedPost,
      { new: true }
    );
    // Use not authorised to update post or posr not found
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });
    res.json({
      success: true,
      message: "successfully updated post",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// @route DELETE api/posts
// @desc delete post
// @access private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "post not found or user not authorised",
      });
    res.json({
      success: true,
      message: "successfully deleted post",
      post: deletedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
