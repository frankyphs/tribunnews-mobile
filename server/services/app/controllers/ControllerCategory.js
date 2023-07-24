const { User, Tag, Post, Category } = require("../models");

class Controller {
  static async getCategory(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json({
        statusCode: 200,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getCategoryById(req, res, next) {
    try {
      const id = req.params.id;
      let data = await Category.findOne({
        where: {
          id,
        },
        include: [Post],
      });

      if (!data) {
        throw { name: "NotFound" };
      }

      res.status(200).json({
        statusCode: 200,
        data: data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;

      let data = await Category.create({
        name,
      });
      res.status(201).json({
        statusCode: 201,
        message: "Added category success",
        data,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      const findData = await Category.findByPk(id);
      if (!findData) throw { name: "NOT_FOUND" };

      await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        statusCode: 200,
        message: `Category deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const data = await Category.update(
        {
          name,
        },
        { where: { id } }
      );

      if (data === 0) {
        throw {
          name: "NOT_FOUND",
        };
      }
      res.status(200).json({
        statusCode: 200,
        message: `Category has been updated`,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
