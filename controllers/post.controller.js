const Post = require("../models/Posts.model");
const Saves = require("../models/Saves.model");
const User = require("../models/User.model");

module.exports.postController = {
  addPost: async (req, res) => {
    try {
      const { text } = req.body;
      const post = await Post.create({
        imagePost: req.file ? req.file.path : "",
        text,
        user: req.user.id,
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  editPost: async (req, res) => {
    try {
      const { text } = req.body;
      await Post.findByIdAndUpdate(req.params.id, {
        imagePost: req.file ? req.file.path : "",
        text,
        user: req.user.id,
      });
      res.status(401).json("Успешно изменено");
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  addLikePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("user");
      const saves = await Saves.findOne({ user: req.user.id });
      const user = await User.findOne({ _id: req.user.id });
      if (!post) {
        return res.status(401).json("ошибка");
      }
      await Post.findByIdAndUpdate(post._id, {
        $addToSet: { likes: user._id },
      });

      // await Saves.findByIdAndUpdate(saves._id, {
      //   $addToSet: { saves: post._id },
      // });

      const post1 = await Post.findById(req.params.id).populate("user");

      res.status(201).json(post1);
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  removeLikePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("likes");
      const saves = await Saves.findOne({ user: req.user.id });
      const user = await User.findOne({ _id: req.user.id });

      if (!post) {
        return res.status(401).json("ошибка");
      }

      await Post.findByIdAndUpdate(post._id, {
        $pull: { likes: user._id },
      });

      // await Saves.findByIdAndUpdate(saves._id, {
      //   $pull: { saves: post._id },
      // });

      res.status(201).json(post);
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  deletePost: async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(201).json("Успешное удаление");
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate("user")
        .populate("likes");
      res.status(201).json(post);
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  getPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate("user").populate("likes");
      res.status(201).json(posts);
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  getMyPost: async (req, res) => {
    try {
      const postsUser = await Post.find({ user: req.user.id })
        .populate("user")
        .populate("likes");
      res.status(201).json(postsUser);
    } catch (error) {
      res.status(401).json({ error });
    }
  },

  getPostOneUser: async (req, res) => {
    try {
      const postsUser = await Post.find({ user: req.params.id })
        .populate("user")
        .populate("likes");
      res.status(201).json(postsUser);
    } catch (error) {
      res.status(401).json({ error });
    }
  },
};
