"use strict";
const { Post } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { userId: getId } = req.userData;
    const postId = +req.params.id;

    const post = await Post.findByPk(postId);
    if (!post) throw { name: "NOT_FOUND" };

    if (post.authorId === getId) {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
