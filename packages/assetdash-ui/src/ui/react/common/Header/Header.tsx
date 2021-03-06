import React from 'react';
import styled from 'styled-components';
import {Logo} from '../Logo';
import {ThemeToggle} from '../../Theme/ThemeToggle';
import {SocialDropdown} from './SocialDropdown';

export const Header = () => (
  <HeaderRow>
    <Logo/>
    <ButtonsRow>
      <ThemeToggle/>
      <SocialDropdown/>
    </ButtonsRow>
  </HeaderRow>
);

const HeaderRow = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid;
  border-color: ${({theme}) => theme.colors.borderPrimary};

  @media(max-width: 600px) {
    padding: 10px;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
`;
