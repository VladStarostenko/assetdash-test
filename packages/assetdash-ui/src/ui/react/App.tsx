import React from 'react';
import {hot} from 'react-hot-loader/root';
import '../styles/reset.sass';
import {BrowserRouter as Router} from 'react-router-dom';
import {HomeWithRouter} from './Home/HomeWithRouter';
import {ThemeContextProvider} from './Theme/ThemeContextProvider';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <HomeWithRouter/>
      </Router>
    </ThemeContextProvider>
  );
};

export default hot(App);
