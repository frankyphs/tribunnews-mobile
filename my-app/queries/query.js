import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPostsQuery {
    posts {
      id
      title
      slug
      content
      imgUrl
      categoryId
      Category {
        name
      }
      Tags {
        id
        name
      }
    }
  }
`;

export const GET_POST_DETAIL = gql`
  query PostDetail($postId: ID) {
    postDetail(postId: $postId) {
      id
      title
      slug
      content
      imgUrl
      categoryId
      Category {
        name
      }
      Tags {
        id
        name
      }
      authorName
    }
  }
`;
