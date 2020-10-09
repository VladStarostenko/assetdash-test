import React from "react";
import { graphql } from "gatsby";
import Layout from "../containers/layout";
// import PostCard from '../components/post-card/post-card';
import Masonry from "react-masonry-component";
import MasonryCard from "../components/masonry-card/masonry-card";
import SEO from "../components/seo";
import {
  TagPostsWrapper,
  TagPageHeading,
  TagName,
  PostRow,
  CategoryPostCol,
} from "./templates.style";

const Category = ({ pageContext, data }: any) => {
  const { category } = pageContext;
  const { edges, totalCount } = data.allDatoCmsBlogPost;

  return (
    <Layout>
      <SEO
        title={category}
        description={`A collection of ${totalCount} post`}
      />

      <TagPostsWrapper>
        <TagPageHeading>
          <TagName>{category}</TagName>
          {`A collection of ${totalCount} post`}
        </TagPageHeading>
        <PostRow>
          <Masonry className="showcase">
            {edges.map(({ node, index }: any) => (
              <CategoryPostCol key={node.slug}>
                <MasonryCard
                  title={node.title}
                  excerpt={node.contentNode.childMarkdownRemark.excerpt}
                  image={node.coverImage.fluid}
                  url={node.slug}
                />
              </CategoryPostCol>
            ))}
          </Masonry>
        </PostRow>
      </TagPostsWrapper>
    </Layout>
  );
};

export default Category;

export const pageQuery = graphql`
  query($id: String!) {
    allDatoCmsBlogPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
    ) {
      totalCount
      edges {
        node {
          title
          slug
          description
          tags {
            title
          }
          categories {
            title
          }
          coverImage {
            fluid(maxWidth: 480, maxHeight: 285) {
              ...GatsbyDatoCmsFluid
            }
          }
          contentNode {
            childMarkdownRemark {
              html
              excerpt
            }
          }
        }
      }
    }
  }
`;
