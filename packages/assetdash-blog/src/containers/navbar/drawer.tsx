import React, { useContext } from 'react';
import Drawer from '../../components/drawer/drawer';
import SocialProfile from '../../components/social-profile/social-profile';
import { DrawerContext } from '../../components/drawer/drawer-context';
// import InstaDrawerGrid from '../instagram-showcase/insta-drawer-grid';
import Menu from './menu';
import {
  DrawerContentWrapper,
  DrawerHead,
  DrawerClose,
  DrawerContentBlock,
  DrawerContentTitle,
  HamburgerIconSquare,
} from './navbar.style';
import { FiX } from 'react-icons/fi';
import {
  IoLogoTwitter,
} from 'react-icons/io';

import { FaTelegramPlane} from 'react-icons/fa'

type MobileMenuProps = {
  items: any;
  logo: string;
};

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

const DrawerComp: React.FunctionComponent<MobileMenuProps> = ({ items }) => {
  const { state, dispatch }: any = useContext(DrawerContext);

  // Toggle drawer
  const toggleDrawer = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  return (
    <Drawer
      width="375px"
      placement="right"
      drawerHandler={
        <HamburgerIconSquare>
          <span />
          <span />
          <span />
        </HamburgerIconSquare>
      }
      open={state.isOpen}
      toggleHandler={toggleDrawer}
    >
      <DrawerContentWrapper>
        <DrawerHead>
          <DrawerClose onClick={toggleDrawer}>
            <FiX />
          </DrawerClose>
        </DrawerHead>
        <Menu items={items} className="mobile-menu" />

        <DrawerContentBlock>
          <DrawerContentTitle>Instagram</DrawerContentTitle>
          {/* <InstaDrawerGrid /> */}
        </DrawerContentBlock>

        <DrawerContentBlock>
          <DrawerContentTitle>Follow us</DrawerContentTitle>
          <SocialProfile items={SocialLinks} />
        </DrawerContentBlock>
      </DrawerContentWrapper>
    </Drawer>
  );
};

export default DrawerComp;
