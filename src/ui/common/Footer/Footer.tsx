import React from 'react';
import styled from 'styled-components';
import { Container } from '../Container';
import { Logo } from '../Logo';
import { FooterNav } from './FooterNav';
import { ThemeToggle } from '../../Theme/ThemeToggle';

export const Footer = () => (
  <FooterView>
    <Container>
      <FooterRow>
        <div>
          <Logo/>
          <CopyText>&copy; 2020 AssetDash</CopyText>
        </div>
        <FooterNav/>
        <ThemeToggle/>
      </FooterRow>
    </Container>
  </FooterView>
);

const FooterView = styled.footer`
  display: flex;
  padding: 24px 0 123px;
  background: #FFFFFF;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CopyText = styled.p`
  margin-top: 8px;
  font-size: 16px;
  line-height: 19px;
  color: #1F3840;
`;
