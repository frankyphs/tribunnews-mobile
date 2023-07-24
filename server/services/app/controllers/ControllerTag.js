const { Post, Tag } = require("../models");

class Controller {
  static async getTags(req, res, next) {
    try {
      let tags = await Tag.findAll();

      res.status(200).json(tags);
    } catch (err) {
      next(err);
    }
  }
  static async getTagDetail(req, res, next) {
    try {
      const { id } = req.params;
      let tag = await Tag.findOne({
        where: {
          id,
        },
        include: [
          {
            Post,
          },
        ],
      });

      if (!tag) {
        throw { name: "NotFound" };
      }

      res.status(200).json(tag);
    } catch (err) {
      next(err);
    }
  }
  static async addTag(req, res, next) {
    try {
      const { name, postId } = req.body;

      let tag = await Tag.create({
        postId,
        name,
      });
      res.status(201).json({
        statusCode: 201,
        message: "New tag added successfully",
        tag,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteTag(req, res, next) {
    try {
      const { id } = req.params;

      const affectedRows = await Tag.destroy({
        where: {
          id,
        },
      });

      if (affectedRows <= 0) {
        throw { name: "NotFound" };
      }

      res.status(200).json({
        statusCode: 200,
        message: `Tag ${id} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
