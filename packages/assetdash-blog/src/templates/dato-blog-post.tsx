import React from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";
import urljoin from "url-join";
import { DiscussionEmbed } from "disqus-react";
import Layout from "../containers/layout";
import SEO from "../components/seo";
import PostCard from "../components/post-card/post-card";
import PostDetails from "../components/post-details/post-details";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from "react-share";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoReddit,
} from "react-icons/io";

import {
  BlogPostDetailsWrapper,
  PostPaginationWrapper,
  GridIcon,
  PrevButton,
  NextButton,
  PostName,
  Text,
  ThumbImg,
  RelatedPostWrapper,
  RelatedPostItems,
  RelatedPostTitle,
  RelatedPostItem,
  BlogPostFooter,
  PostShare,
  BlogPostComment,
} from "./templates.style";
import Icon from "../images/grid.svg";
import IconNext from "../images/arrow-next.svg";
import IconPrev from "../images/arrow-prev.svg";
import { backgroundColor } from "styled-system";

const BlogPostTemplate = ({ pageContext, ...props }: any) => {
  console.log(props);
  const post = props.data.datoCmsBlogPost;
  const { edges } = props.data.relatedPost;
  const title = post.title;
  const slug = post.slug;
  const siteUrl = props.data.site.siteMetadata.siteUrl;
  const shareUrl = urljoin(siteUrl, slug);
  console.log({ pageContext });
  const { next, previous } = props.data;

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  };

  return (
    <Layout>
      <SEO title={post.title} description={post.description || post.excerpt} />
      <BlogPostDetailsWrapper>
        <PostDetails
          title={post.title}
        //   date={"lol"}
          categories={post.categories.map((c: any) => c.title)}
          preview={post.coverImage.fluid}
          description={post.contentNode.childMarkdownRemark.html}
        />

        <BlogPostFooter className={post.cover == null ? "center" : ""}>
          <PostShare>
            <FacebookShareButton url={shareUrl} quote={post.excerpt}>
              <IoLogoFacebook size="23px" />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <IoLogoTwitter size="23px" />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} title={title}>
              <IoLogoLinkedin size="23px" />
            </LinkedinShareButton>
            <RedditShareButton url={shareUrl} title={`${post.title}`}>
              <IoLogoReddit size="23px" />
            </RedditShareButton>
          </PostShare>
        </BlogPostFooter>

        <PostPaginationWrapper>
          <PrevButton>
            {next && (
              <Link to={next.slug}>
                <Text>
                  <img src={IconPrev} alt="<" />
                  &nbsp; Previous
                </Text>
                <PostName>
                  <ThumbImg>
                    <img src={next.coverImage.fluid.src} alt={next.title} />
                  </ThumbImg>
                  <span>{next.title}</span>
                </PostName>
              </Link>
            )}
          </PrevButton>

          <GridIcon>
            <img src={Icon} alt="Grid Icon" />
          </GridIcon>

          <NextButton>
            {previous && (
              <Link to={previous.slug}>
                <Text>
                  Next &nbsp;
                  <img src={IconNext} alt=">" />
                </Text>
                <PostName>
                  <ThumbImg>
                    <img
                      src={previous.coverImage.fluid.src}
                      alt={previous.title}
                    />
                  </ThumbImg>
                  <span>{previous.title}</span>
                </PostName>
              </Link>
            )}
          </NextButton>
        </PostPaginationWrapper>

        <BlogPostComment className={post.coverImage == null ? "center" : ""}>
          <DiscussionEmbed {...disqusConfig} />
        </BlogPostComment>
      </BlogPostDetailsWrapper>

      {edges.length !== 0 && (
        <RelatedPostWrapper>
          <RelatedPostTitle>Related Posts</RelatedPostTitle>
          <RelatedPostItems>
            {edges.map(({ node }: any) => (
              <RelatedPostItem key={node.slug}>
                <PostCard
                  title={node.title || node.slug}
                  excerpt={node.contentNode.childMarkdownRemark.excerpt}
                  image={node.coverImage.fluid}
                  url={node.slug}
                />
              </RelatedPostItem>
            ))}
          </RelatedPostItems>
        </RelatedPostWrapper>
      )}
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $nextPostId: String
    $previousPostId: String
    $tags: [String]
  ) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    datoCmsBlogPost(id: { eq: $id }) {
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
    next: datoCmsBlogPost(id: { eq: $nextPostId }) {
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
    previous: datoCmsBlogPost(id: { eq: $previousPostId }) {
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
    relatedPost: allDatoCmsBlogPost(
      filter: { tags: { elemMatch: { title: { in: $tags } } } }
    ) {
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
