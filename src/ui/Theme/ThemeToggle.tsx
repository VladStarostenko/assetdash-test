import React, { useContext } from 'react';
import styled from 'styled-components';
import moon from '../../assets/icons/moon.svg';
import sun from '../../assets/icons/sun.svg';
import { ThemeContext } from './ThemeContextProvider';

export const ThemeToggle = () => {
  const [theme, toggleTheme] = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme}>
      <img src={theme === 'light' ? moon : sun} alt="moon"/>
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.borderPrimary};
  border-radius: 2px;
  cursor: pointer;
`;
