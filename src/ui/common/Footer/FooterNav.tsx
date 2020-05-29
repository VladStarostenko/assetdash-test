import React from 'react'
import { NavList, NavItem, NavigationLink } from '../Nav/Nav'

export const FooterNav = () => (
  <NavList>
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
)
