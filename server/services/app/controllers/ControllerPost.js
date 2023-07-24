const { Tag, Post, Category, sequelize } = require("../models");
const axios = require("axios");

class Controller {
  static async getPost(req, res, next) {
    try {
      const data = await Post.findAll({
        include: [Category, Tag],
      });
      res.status(200).json({
        statusCode: 200,
        data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createPost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      // const id = req.userData.userId;

      const {
        title,
        content,
        imgUrl,
        categoryId,
        name1,
        name2,
        name3,
        authorId,
      } = req.body;
      const createPost = await Post.create(
        {
          title,
          slug: title.toLowerCase().split(" ").join("-"),
          content,
          imgUrl,
          categoryId,
          authorId,
        },
        { transaction: t }
      );

      await Tag.bulkCreate(
        [
          { postId: createPost.id, name: name1 },
          { postId: createPost.id, name: name2 },
          { postId: createPost.id, name: name3 },
        ],
        { transaction: t }
      );

      await t.commit();

      res.status(201).json({
        statusCode: 201,
        message: "New post created successfully",
      });
    } catch (err) {
      if (t) {
        await t.rollback();
      }
      console.log(err);
      next(err);
    }
  }

  static async getPostById(req, res, next) {
    const id = req.params.id;
    try {
      const post = await Post.findOne({
        where: {
          id: id,
        },
        include: [Category, Tag],
      });
      if (!post) {
        throw { name: "NotFound" };
      }
      res.status(200).json({
        statusCode: 200,
        data: post,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deletePostById(req, res, next) {
    const id = req.params.id;
    try {
      const findData = await Post.findByPk(id);
      if (!findData) throw { name: "NOT_FOUND" };
      const data = await Post.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: `Post success to delete`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async editPostById(req, res, next) {
    try {
      const t = await sequelize.transaction();
      const id = req.params.id;
      const { title, content, imgUrl, categoryId, name1, name2, name3 } =
        req.body;
      const data = await Post.update(
        {
          title,
          content,
          imgUrl,
          categoryId,
        },
        { where: { id } }
      );

      if (data === 0) {
        throw {
          name: "NOT_FOUND",
        };
      }
      await Tag.destroy(
        {
          where: { postId: id },
        },
        {
          transaction: t,
        }
      );
      await Tag.bulkCreate(
        [
          { postId: id, name: name1 },
          { postId: id, name: name2 },
          { postId: id, name: name3 },
        ],
        { transaction: t }
      );
      await t.commit();
      const postFound = await Post.findByPk(id);
      res.status(200).json({
        statusCode: 200,
        message: `Post has been updated`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
