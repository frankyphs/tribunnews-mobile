"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // Post.belongsTo(models.User, { foreignKey: "authorId" });
      Post.hasMany(models.Tag, { foreignKey: "postId" });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required!",
          },
          notNull: {
            msg: "Title is required!",
          },
        },
      },
      slug: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Content is required!",
          },
          notNull: {
            msg: "Content is required!",
          },
        },
      },
      imgUrl: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
