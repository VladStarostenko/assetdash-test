import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'


interface ScreenProps {
  children: ReactNode
}

export const Screen = ({ children }: ScreenProps) => (
  <ScreenView>
    <Header/>
    <Main>
      {children}
    </Main>
    <Footer/>
  </ScreenView>
)

const ScreenView = styled.div`
  min-height: 100vh;
  display: flex;  
  flex-direction: column;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
