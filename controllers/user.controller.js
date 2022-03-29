const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userController = {
  registerUser: async (req, res) => {
    try {
      const { firstname, lastname, login, email, password, passwordValid } =
        req.body;
      const searchLogin = await User.findOne({ login });
      const searchEmail = await User.findOne({ email });
      if (searchEmail) {
        return res.status(401).json("Такой email уже существует");
      } else if (searchLogin) {
        return res.status(401).json("Такой логин уже существует");
      } else if (password !== passwordValid) {
        return res.status(401).json("Пароли не совпадают");
      }

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
      });
      if (!registeredUser) {
        return res
          .status(401)
          .json(
            "ошибка регистрации, пожалуйста проверьте правильность введенных данных"
          );
      }
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
      const { firstname, lastname, login, email } = req.body;
      await User.findByIdAndUpdate(req.user.id, {
        firstname,
        lastname,
        login,
        email,
        avatar: req.file ? req.file.path : "",
      });

      const searchLogin = await User.findOne({ login });
      const searchEmail = await User.findOne({ email });
      if (searchEmail) {
        return res.json("Такой email уже существует");
      } else if (searchLogin) {
        return res.json("Такой логин уже существует");
      }
      res.json("Данные успешно изменены");
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json({
        login: user.login,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.jsoN({ error: error.toString() });
    }
  },
};
