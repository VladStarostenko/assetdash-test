import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavList = styled.ul`
  display: flex;
  align-items: center;
`;

export const NavItem = styled.li`
  & + & {
    margin-left: 40px;
  }
`;

export const NavigationLink = styled(NavLink)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #8395AE;
`;
