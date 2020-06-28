import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

interface ScreenProps {
  children: ReactNode;
}

export const Screen = ({children}: ScreenProps) => (
  <ScreenView>
    <Header/>
    <Main>
      {children}
    </Main>
    <Footer/>
  </ScreenView>
);

const ScreenView = styled.div`
  min-height: 100vh;
  display: flex;  
  flex-direction: column;
  background: ${({theme}) => theme.colors.backgroundPrimary};
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 56px;

  @media(max-width: 990px) {
    padding-top: 40px;
  }

  @media(max-width: 600px) {
    padding-top: 24px;
  }
`;

export const ScreenContent = styled.div`
  flex-grow: 1;
  padding: 32px 0;
  background: ${({theme}) => theme.colors.backgroundSecondary};

  @media(max-width: 990px) {
    padding-top: 16px;
  }
`;
