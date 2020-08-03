import React from 'react';
import '../styles/reset.sass';
import {hot} from 'react-hot-loader/root';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home/Home';
import {ThemeContextProvider} from './Theme/ThemeContextProvider';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/all" component={Home}/>
          <Route exact path="/watchlist" component={Home}/>
          <Route exact path="/:currentPage" component={Home}/>
        </Switch>
      </Router>
    </ThemeContextProvider>
  );
};

export default hot(App);
