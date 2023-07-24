const { User, Tag, Post, Category } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class Controller {
  static async handleRegister(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      if (!username || !password) {
        throw { name: "Required" };
      }
      const registerData = await User.create({
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address,
      });
      res.status(201).json({
        statusCode: 201,
        message: "User success register",
        id: registerData.id,
        username: registerData.username,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async handleLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) throw { name: "Required" };
      const findData = await User.findOne({
        where: {
          email,
        },
      });

      if (!findData) {
        throw { name: "NOT_FOUND" };
      }

      const validatePassword = comparePassword(password, findData.password);

      if (!validatePassword) {
        throw { name: "INVALID" };
      }

      const token = signToken({
        id: findData.id,
        email: findData.email,
        username: findData.username,
      });

      res.status(200).json({
        statusCode: 200,
        message: "Login success",
        token,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
