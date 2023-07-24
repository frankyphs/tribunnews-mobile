const APP_SERVER_URL = process.env.APP_SERVER_URL || "http://localhost:4002";
const USER_SERVER_URL = process.env.USER_SERVER_URL || "http://localhost:4001";
const axios = require("axios");
const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis(13845, process.env.REDIS_URL);

const typeDefs = `#graphql
  # === DEFINE TYPES ===
  type Tag {
    id: ID,
    name: String,
  }

  type Category {
    name: String
  }

  type Post {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: String,
    Category: Category
    Tags: [Tag],
  }

  type PostDetail {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: String,
    Category: Category
    Tags: [Tag],
    authorName: String
  }

  type addPostResponse {
    id: ID,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: String,
  }

  type deletePostResponse {
    message: String
  }

  type editPostResponse {
    message: String
  }

  input postInput {
    title: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: String
  }

  input tagInput {
    name: String,
  }

  # === QUERIES AND MUTATIONS ===
  type Query {
    posts: [Post],
    postDetail(postId: ID): PostDetail
  }

  type Mutation {
    addPost(postData: postInput, tagData: [tagInput]): addPostResponse,
    deletePost(postId: ID): deletePostResponse,
    editPost(postId: ID, postData: postInput, tagData: [tagInput]): editPostResponse
  }
`;

const resolvers = {
  Query: {
    posts: async () => {
      try {
        let postsCache = await redis.get("posts");

        // console.log(postsCache);
        if (postsCache) {
          let postsResult = JSON.parse(postsCache);
          // console.log(postsResult);
          return postsResult.data;
        }

        const { data } = await axios.get(`${APP_SERVER_URL}/posts`);

        redis.set("posts", JSON.stringify(data));

        return data.data;
      } catch (error) {
        console.log(error);
        // throw new Error(error.response.data.error);
      }
    },

    postDetail: async (_, { postId }) => {
      try {
        let { data } = await axios.get(`${APP_SERVER_URL}/posts/${postId}`);
        const authorId = data.data.authorId;

        // console.log(authorId);
        const { data: authorData } = await axios.get(
          `${USER_SERVER_URL}/users/${authorId}`
        );

        data.data.authorName = authorData.username;

        return data.data;
      } catch (error) {
        console.log(error);
        // throw new Error(error.response.data.error);
      }
    },
  },

  Mutation: {
    addPost: async (_, args) => {
      try {
        const { data } = await axios.post(`${APP_SERVER_URL}/posts`, args);
        redis.del("posts");

        return data;
      } catch (error) {
        console.log(error);
        // throw new Error(error.response.data.error);
      }
    },

    deletePost: async (_, { postId }) => {
      try {
        const { data } = await axios.delete(
          `${APP_SERVER_URL}/posts/${postId}`
        );

        redis.del("posts");

        return data;
      } catch (error) {
        console.log(error);
        // throw new Error(error.response.data.error);
      }
    },

    editPost: async (_, args) => {
      try {
        const { postId } = args;

        const { data } = await axios.put(
          `${APP_SERVER_URL}/posts/${postId}`,
          args
        );

        redis.del("posts");

        return data;
      } catch (error) {
        // throw new Error(error.response.data.error);
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
