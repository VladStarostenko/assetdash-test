import React from 'react'
import styled from 'styled-components'

export const Logo = () => <LogoText>Asset<span>Dash</span></LogoText>

const LogoText = styled.p`
  font-size: 22px;
  line-height: 26px;
  letter-spacing: -0.04em;
  color: #000000;

  & span {
    font-weight: 700
  }
`
