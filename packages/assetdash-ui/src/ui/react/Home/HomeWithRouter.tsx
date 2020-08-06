import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';

export const HomeWithRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/all" component={Home}/>
      <Route exact path="/watchlist" component={Home}/>
      <Route path="/" component={Home}/>
    </Switch>
  );
};
