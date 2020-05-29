import React from 'react'
import styled from 'styled-components'
import moonIcon from '../../assets/icons/moon.svg'

export const ThemeToggle = () => (
  <ToggleButton>
    <img src={moonIcon} alt="moon"/>
  </ToggleButton>
)

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E7EBF2;
  border-radius: 2px;
  cursor: pointer;
`
