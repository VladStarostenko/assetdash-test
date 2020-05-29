import React from 'react'
import styled from 'styled-components'
import { Logo } from '../Logo'
import { HeaderNav } from './HeaderNav'
import { ButtonSecondary } from '../Button/ButtonSecondary'
import { ThemeToggle } from '../../Theme/ThemeToggle'

export const Header = () => (
  <HeaderRow>
    <Logo/>
    <HeaderNav/>
    <ButtonsRow>
      <LoginButton>Login</LoginButton>
      <ThemeToggle/>
    </ButtonsRow>
  </HeaderRow>
)

const HeaderRow = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23px 24px;
  border-bottom: 1px solid #E7EBF2;
`

const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
`

const LoginButton = styled(ButtonSecondary)`
  margin-right: 8px;
`
