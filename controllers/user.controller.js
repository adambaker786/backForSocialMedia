const User = require("../models/User.model");
const Saves = require("../models/Saves.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("../models/Posts.model");
const Comment = require("../models/Comments.model");
const Message = require("../models/Message.model");
const Conversation = require("../models/Conversation.model");

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const { firstname, lastname, login, email, password } = req.body;
      const searchLogin = await User.findOne({ login });
      const searchEmail = await User.findOne({ email });
      if (searchEmail) {
        return res.status(401).json("Такой email уже существует");
      } else if (searchLogin) {
        return res.status(401).json("Такой логин уже существует");
      }

      const role = login === "admin" ? "admin" : "user";

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const registeredUser = await User.create({
        firstname,
        lastname,
        login,
        email,
        password: hash,
        avatar: req.file ? req.file.path : "",
        role,
      });

      if (!registeredUser) {
        return res
          .status(401)
          .json(
            "ошибка регистрации, пожалуйста проверьте правильность введенных данных"
          );
      }

      await Saves.create({
        user: registeredUser._id,
      });
      res.status(201).json("Регистрация прошла успешно");
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (!candidate) {
        return res.json("Неверный email или пароль");
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.json("Неверный email или пароль");
      }

      const payload = {
        id: candidate._id,
        firstname: candidate.firstname,
        lastname: candidate.lastname,
        login: candidate.login,
        email: candidate.email,
      };

      const token = await jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "30d",
      });
      res.json({
        token,
        id: candidate._id,
        login: payload.login,
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.lastname,
      });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  editUser: async (req, res) => {
    try {
      const { id } = req.user;
      await User.findByIdAndUpdate(id, {
        ...req.body,
        avatar: req.file && req.file.path,
      });
      const user = await User.findOne({ _id: id });
      res.json(user);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  addFreind: async (req, res) => {
    try {
      const id = req.body.id.id;
      await User.findByIdAndUpdate(req.params.id, {
        $addToSet: { follows: id },
      });
      await User.findByIdAndUpdate(id, {
        $addToSet: { freinds: req.params.id },
      });
      const user = await User.findById(req.params.id);
      console.log(1);
      res.status(401).json(user);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  removeFreind: async (req, res) => {
    try {
      const id = req.body.id.id;
      await User.findByIdAndUpdate(req.params.id, {
        $pull: { follows: id },
      });
      await User.findByIdAndUpdate(id, {
        $pull: { freinds: req.params.id },
      });
      const user = await User.findById(req.params.id);
      res.status(401).json(user);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
        .populate("freinds")
        .populate("follows");

      res.json({
        user: user,
        id: req.user.id,
        login: user.login,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image: user.avatar,
      });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  getUserId: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate("freinds")
        .populate("follows");

      res.json({
        user,
        login: user.login,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        image: user.avatar,
      });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find().populate("freinds").populate("follows");
      res.json(users);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Post.deleteMany({ user: req.params.id });
      await Comment.deleteMany({ user: req.params.id });
      await Message.deleteMany({ sender: req.params.id });
      await Conversation.deleteMany({ members: req.params.id });
      res.json("Пользователь успешно заблокирован");
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
};
