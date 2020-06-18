import React, {useContext} from 'react';
import moon from '../../assets/icons/moon.svg';
import sun from '../../assets/icons/sun.svg';
import {ThemeContext} from './ThemeContextProvider';
import {IconButton} from '../common/Button/IconButton';

export const ThemeToggle = () => {
  const [theme, toggleTheme] = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme}>
      <img src={theme === 'light' ? moon : sun} alt="theme toggle"/>
    </IconButton>
  );
};
