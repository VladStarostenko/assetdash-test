import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../containers/layout';
import PostCard from '../components/post-card/post-card';
import SEO from '../components/seo';
import { TagPostsWrapper, TagPageHeading, TagName } from './templates.style';

const Tags = ({ pageContext, data }: any) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allDatoCmsBlogPost;

  return (
    <Layout>
      <SEO title={tag} description={`A collection of ${totalCount} post`} />

      <TagPostsWrapper>
        <TagPageHeading>
          <TagName>{tag}</TagName>
          {`A collection of ${totalCount} post`}
        </TagPageHeading>
        {edges.map(({ node, index }: any) => (
          <PostCard
            key={node.slug}
            title={node.title}
            url={node.slug}
            description={node.description || node.contentNode.childMarkdownRemark.excerpt}
            date={node.date}
            tags={node.tags.map((t:any) => t.title)}
          />
        ))}
      </TagPostsWrapper>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($id: String!) {
    allDatoCmsBlogPost(
      filter: { tags: { elemMatch: { id: { eq: $id } } } }
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