const { User } = require("../models");

const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "InvalidToken" };
    }

    const verify = verifyToken(access_token);

    const userId = verify.id;

    const user = await User.findByPk(userId);
    if (!user) {
      throw { name: "InvalidToken" };
    }

    req.userData = { userId: user.id };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
