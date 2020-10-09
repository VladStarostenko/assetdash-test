const path = require(`path`);
const _ = require("lodash");
const { createFilePath } = require(`gatsby-source-filesystem`);
const { graphql } = require("gatsby");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const DatoBlogPost = path.resolve(`./src/templates/dato-blog-post.tsx`);
  const DatoCategory = path.resolve(`./src/templates/dato-category.tsx`);
  const DatoTag = path.resolve(`./src/templates/dato-category.tsx`);

  //DatoCmsPages

  //Create Blog Post

  const postsQuery = await graphql(`
    query {
      allDatoCmsBlogPost {
        edges {
          node {
            id
            slug
            tags {
              title
            }
          }
        }
      }
    }
  `);

  const posts = postsQuery.data.allDatoCmsBlogPost.edges;

  posts.forEach((node, index) => {
    const post = node.node;
    createPage({
      path: `${post.slug}`,
      component: DatoBlogPost,
      context: {
        id: post.id,
        tags: post.tags.map((t) => t.title),
      },
    });
  });

  const categoryQuery = await graphql(`
    query {
      allDatoCmsCategory {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);

  const categories = categoryQuery.data.allDatoCmsCategory.edges;

  categories.forEach((node, index) => {
    const { id, title } = node.node;
    createPage({
      path: `category/${_.kebabCase(title)}/`,
      component: DatoCategory,
      context: {
        id,
        category: title,
      },
    });
  });

  const TagsQuery = await graphql(`
    query {
      allDatoCmsTag {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `);

  const tags = TagsQuery.data.allDatoCmsTag.edges;

  tags.forEach((node, index) => {
    const { id, title } = node.node;
    console.log({ id });
    createPage({
      path: `tag/${_.kebabCase(title)}/`,
      component: DatoTag,
      context: {
        id,
        tag: title,
      },
    });
  });
};

// for React-Hot-Loader: react-🔥-dom patch is not detected
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith("develop") && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-dom": "@hot-loader/react-dom",
    };
  }
};
