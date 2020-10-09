import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import SocialProfile from "../../components/social-profile/social-profile";
import FooterWrapper, {
  FooterCol,
  Logo,
  Infos,
  FooterTitle,
  FooterContent,
  Menu,
} from "./footer.style";

import _ from 'lodash';

import { IoLogoTwitter } from "react-icons/io";

import { FaTelegramPlane } from "react-icons/fa";

const MenuItems = [
  {
    label: "About",
    url: "/about",
  },
  {
    label: "Contact",
    url: "/contact",
  },
  {
    label: "404 Page",
    url: "/404",
  },
];

const SocialLinks = [
  {
    icon: <IoLogoTwitter />,
    url: "https://twitter.com/assetdash",
    tooltip: "",
  },
  {
    icon: <FaTelegramPlane />,
    url: "https://t.me/assetdashdotcom",
    tooltip: "",
  },
];

type FooterProps = {
  children: React.ReactNode;
};

const Footer: React.FunctionComponent<FooterProps> = ({
  children,
  ...props
}) => {
  const Data = useStaticQuery(graphql`
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

  const Category = Data.allDatoCmsCategory.edges;

  return (
    <FooterWrapper {...props}>
      <FooterCol>
        <Logo>
          <Link to="/">
            Asset<span>Dash</span>
          </Link>
        </Logo>

        <Infos>23 King Street, 5th Avenue, New York</Infos>
        <Infos>+1-2345-6789-9</Infos>
        <br />
        <Infos>
          Copyright &copy;&nbsp;
          <a href="https://redq.io/"> RedQ, Inc.</a>
        </Infos>
      </FooterCol>

      {/* <FooterCol>
        <FooterTitle>Quick Links</FooterTitle>

        <FooterContent>
          {MenuItems.map((item, index) => (
            <Menu key={index} to={item.url}>
              {item.label}
            </Menu>
          ))}
        </FooterContent>
      </FooterCol> */}

      <FooterCol>
        <FooterTitle>Category</FooterTitle>

        <FooterContent>
          {Category.slice(0, 4).map((cat: any, index: any) => (
            <Menu key={index} to={`/category/${_.kebabCase(cat.node.title)}`}>
              {cat.node.title}
            </Menu>
          ))}
        </FooterContent>
      </FooterCol>

      <FooterCol>
        <FooterTitle>Follow Us</FooterTitle>

        <SocialProfile items={SocialLinks} />
      </FooterCol>
    </FooterWrapper>
  );
};

export default Footer;
