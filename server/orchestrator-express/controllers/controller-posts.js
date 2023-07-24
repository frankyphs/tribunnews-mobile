const Redis = require("ioredis");
const axios = require("axios");
require("dotenv").config();

const redis = new Redis(13845, process.env.REDIS_URL);

const APP_SERVER_URL = process.env.APP_SERVER_URL || "http://localhost:4002";

class Controller {
  static async getPosts(req, res, next) {
    try {
      // apakah ada cache?
      let postsCache = await redis.get("posts");

      // jika ada
      if (postsCache) {
        let postsResult = JSON.parse(postsCache);
        // ambil data dari cache
        return res.status(200).json(postsResult);
      }

      // jika cache tidak ada
      const response = await axios.get(`${APP_SERVER_URL}/posts`);

      // buat cache ke redis
      redis.set("posts", JSON.stringify(response.data));

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async postPost(req, res, next) {
    try {
      const inputData = req.body;

      const response = await axios.post(`${APP_SERVER_URL}/posts`, inputData);

      // hapus cache setiap kali melakukan add data
      redis.del("posts");

      res.status(201).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async getPostDetail(req, res, next) {
    try {
      const id = req.params.id;

      const response = await axios.get(`${APP_SERVER_URL}/posts/${id}`);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async editPost(req, res, next) {
    try {
      const id = req.params.id;
      const inputData = req.body;

      const response = await axios.put(
        `${APP_SERVER_URL}/posts/${id}`,
        inputData
      );

      redis.del("posts");

      res.status(201).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }

  static async deletePost(req, res, next) {
    try {
      const id = req.params.id;

      const response = await axios.delete(`${APP_SERVER_URL}/posts/${id}`);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(501).json({
        statusCode: 501,
      });
    }
  }
}

module.exports = Controller;
