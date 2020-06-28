import React from 'react';
import {NavList, NavItem, NavigationLink} from '../Nav/Nav';

interface FooterNavProps {
  className?: string;
}

export const FooterNav = ({className}: FooterNavProps) => (
  <NavList className={className || ''}>
    <NavItem>
      <NavigationLink to="/home">Home</NavigationLink>
    </NavItem>
    <NavItem>
      <NavigationLink to="/stocks">Stocks</NavigationLink>
    </NavItem>
    <NavItem>
      <NavigationLink to="/etf">ETFs</NavigationLink>
    </NavItem>
    <NavItem>
      <NavigationLink to="/cryptocurrencies">Cryptocurrencies</NavigationLink>
    </NavItem>
  </NavList>
);
