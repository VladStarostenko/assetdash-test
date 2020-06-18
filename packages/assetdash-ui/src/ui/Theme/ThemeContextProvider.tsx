import React, {createContext, ReactNode} from 'react';
import {useThemeMode} from '../hooks/useThemeMode';
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme} from './themes';

type ContextProps = [string, () => void];

export const ThemeContext = createContext<ContextProps>(['light', () => undefined]);

export type ThemeProps = {
  children: ReactNode;
};

export const ThemeContextProvider = ({children}: ThemeProps) => {
  const {theme, toggleTheme} = useThemeMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <ThemeProvider theme={themeMode}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
