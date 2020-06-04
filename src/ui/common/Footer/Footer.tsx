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
        <ThemeToggle/>
      </FooterRow>
    </Container>
  </FooterView>
);

const FooterView = styled.footer`
  display: flex;
  padding: 24px 0 123px;
  background: ${({ theme }) => theme.colors.backgroundPrimary};

  @media(max-width: 700px) {
    padding-bottom: 24px;
  }
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;

  @media(max-width: 700px) {
    flex-wrap: wrap;
  }
`;

const CopyText = styled.p`
  margin-top: 8px;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.colorPrimary};
`;

const Nav = styled(FooterNav)`
  @media(max-width: 700px) {
    order: 1;
    width: 100%;
    justify-content: center;
    margin-top: 37px;
  }
`;
