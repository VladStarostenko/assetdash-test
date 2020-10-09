import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import PostSlideCard from "../../../components/post-slide-card/post-slide-card";
import PostSliderWrapper, { PrevButton, NextButton } from "./style";
SwiperCore.use([Navigation, Pagination]);

const SimpleSwiper = () => {
  const data = useStaticQuery(graphql`
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
  const posts = data.allDatoCmsBlogPost.edges;

  return (
    <PostSliderWrapper>
      <Swiper
        speed={600}
        spaceBetween={30}
        navigation={{
          prevEl: ".ps-button-prev",
          nextEl: ".ps-button-next",
        }}
        pagination={{
          clickable: true,
        }}
      >
        {posts.map(({ node }: any) => (
          <SwiperSlide key={node.slug}>
            <PostSlideCard
              title={node.title || node.slug}
              image={node.coverImage.fluid}
              url={node.slug}
              tags={node.tags.map((t:any) => t.title)}
              description={node.description || node.contentNode.childMarkdownRemark.excerpt}
            />
          </SwiperSlide>
        ))}
        <PrevButton className="ps-button-prev" aria-label="prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="20"
            viewBox="0 0 11 20"
          >
            <path
              id="Path_21330"
              data-name="Path 21330"
              d="M97.534,10.99l8.3,8.6a1.317,1.317,0,0,0,1.911,0,1.437,1.437,0,0,0,0-1.98L100.4,10l7.342-7.609a1.437,1.437,0,0,0,0-1.981,1.318,1.318,0,0,0-1.911,0l-8.3,8.6a1.437,1.437,0,0,0,0,1.98Z"
              transform="translate(-97.139 0)"
              fill="currentColor"
            />
          </svg>
        </PrevButton>
        <NextButton className="ps-button-next" aria-label="next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="20"
            viewBox="0 0 11 20"
          >
            <path
              id="Path_21330"
              data-name="Path 21330"
              d="M107.743,10.99l-8.3,8.6a1.317,1.317,0,0,1-1.911,0,1.437,1.437,0,0,1,0-1.98L104.876,10,97.534,2.391a1.437,1.437,0,0,1,0-1.981,1.318,1.318,0,0,1,1.911,0l8.3,8.6a1.437,1.437,0,0,1,0,1.98Z"
              transform="translate(-97.139 0)"
              fill="currentColor"
            />
          </svg>
        </NextButton>
      </Swiper>
    </PostSliderWrapper>
  );
};

export default SimpleSwiper;
