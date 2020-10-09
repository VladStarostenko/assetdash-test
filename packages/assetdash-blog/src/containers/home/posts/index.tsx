import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Masonry from 'react-masonry-component';
import MasonryCard from '../../../components/masonry-card/masonry-card';
import Button from '../../../components/button/button';
import BlogPostsWrapper, { PostRow, PostCol, LoadMoreButton } from './style';

type PostsProps = {};

const Posts: React.FunctionComponent<PostsProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allDatoCmsBlogPost {
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
  `);

  const Posts = Data.allDatoCmsBlogPost.edges;
  const TotalPost = Data.allDatoCmsBlogPost.edges.length;

  const [state, setState] = useState({
    visibile: 8,
  });

  const [load, setload] = useState({
    loading: false,
  });

  const fetchMoreData = () => {
    setload({ loading: true });

    setTimeout(function () {
      setState((prev) => {
        return { visibile: prev.visibile + 8 };
      });
      setload({ loading: false });
    }, 1000);
  };

  return (
    <BlogPostsWrapper>
      <PostRow>
        <Masonry className='showcase'>
          {Posts.slice(0, state.visibile).map(({ node }: any) => {
            const title = node.title || node.slug;
            return (
              <PostCol key={node.slug}>
                <MasonryCard
                  title={title}
                  excerpt={node.contentNode.childMarkdownRemark.excerpt}
                  image={
                    node.coverImage.fluid
                  }
                  url={node.slug}
                />
              </PostCol>
            );
          })}
        </Masonry>

        <LoadMoreButton>
          {state.visibile < TotalPost ? (
            <Button
              title='Load more'
              type='submit'
              onClick={fetchMoreData}
              isLoading={load.loading == true ? true : false}
              loader='Loading..'
              style={{ borderRadius: 3, fontWeight: 700 }}
            />
          ) : (
            <p>No more posts</p>
          )}
        </LoadMoreButton>
      </PostRow>
    </BlogPostsWrapper>
  );
};

export default Posts;
