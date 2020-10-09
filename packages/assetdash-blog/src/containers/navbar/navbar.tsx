import React, { useState } from 'react';
import { Link } from 'gatsby';
import { IoIosSearch, IoIosClose } from 'react-icons/io';
import { DrawerProvider } from '../../components/drawer/drawer-context';
import SocialProfile from '../../components/social-profile/social-profile';
import Menu from './menu';
import Drawer from './drawer';
import SearchContainer from '../search/search';
import HeaderWrapper, {
  HeaderTop,
  TopBarWrapper,
  NavbarWrapper,
  Logo,
  MenuWrapper,
  NavSearchButton,
  NavSearchWrapper,
  SearchCloseButton,
  NavSearchFromWrapper,
  SocialProfileWrapper,
} from './navbar.style';
import LogoImage from '../../images/AssetDashLogo.png';

import { IoLogoTwitter } from "react-icons/io";

import { FaTelegramPlane } from "react-icons/fa";

type NavbarProps = {
  className?: string;
};

const MenuItems = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'About',
    url: '/about',
  },
  {
    label: 'Contact',
    url: '/contact',
  },
  {
    label: '404 Page',
    url: '/404',
  },
];

const SocialLinks = [
  {
    icon: <IoLogoTwitter />,
    url: 'https://twitter.com/assetdash',
    tooltip: '',
  },
  {
    icon: <FaTelegramPlane />,
    url: 'https://t.me/assetdashdotcom',
    tooltip: '',
  },
];
const Navbar: React.FunctionComponent<NavbarProps> = ({
  className,
  ...props
}) => {
  const [state, setState] = useState({
    toggle: false,
    search: '',
  });

  const toggleHandle = () => {
    setState({
      ...state,
      toggle: !state.toggle,
    });
  };

  // Add all classs to an array
  const addAllClasses = ['header'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <HeaderWrapper className={addAllClasses.join(' ')} {...props}>
      <HeaderTop>
        <TopBarWrapper>
          <SocialProfileWrapper>
            <SocialProfile items={SocialLinks} />
          </SocialProfileWrapper>
          <Logo>
            <Link to="/">
              <img src={LogoImage} alt="logo" />
            </Link>
          </Logo>

          <NavSearchButton
            type="button"
            aria-label="search"
            onClick={toggleHandle}
          >
            <IoIosSearch size="23px" />
          </NavSearchButton>

          <DrawerProvider>
            <Drawer items={MenuItems} logo={LogoImage} />
          </DrawerProvider>
        </TopBarWrapper>
        <NavSearchWrapper className={state.toggle === true ? 'expand' : ''}>
          <NavSearchFromWrapper>
            <SearchContainer />
            <SearchCloseButton
              type="submit"
              aria-label="close"
              onClick={toggleHandle}
            >
              <IoIosClose />
            </SearchCloseButton>
          </NavSearchFromWrapper>
        </NavSearchWrapper>
      </HeaderTop>

      {/* <NavbarWrapper className='navbar'>
        <MenuWrapper>
          <Menu items={MenuItems} />
        </MenuWrapper>
      </NavbarWrapper> */}
    </HeaderWrapper>
  );
};

export default Navbar;
