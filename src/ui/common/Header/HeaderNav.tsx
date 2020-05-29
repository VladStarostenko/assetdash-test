import React from 'react';
import styled from 'styled-components';
import { NavItem, NavList, NavigationLink } from '../Nav/Nav';

export const HeaderNav = () => (
  <NavList>
    <HeaderNavItem>
      <HeaderLink to="/">Home</HeaderLink>
    </HeaderNavItem>
    <HeaderNavItem>
      <HeaderLink to="/stocks">Stocks</HeaderLink>
    </HeaderNavItem>
    <HeaderNavItem>
      <HeaderLink to="/etf">ETFs</HeaderLink>
    </HeaderNavItem>
    <HeaderNavItem>
      <HeaderLink to="/cryptocurrencies">Cryptocurrencies</HeaderLink>
    </HeaderNavItem>
  </NavList>
);

const HeaderNavItem = styled(NavItem)`
  & + & {
    margin-left: 29px;
  }
`;

const HeaderLink = styled(NavigationLink)`
  padding: 0 5px 26px;
`;
