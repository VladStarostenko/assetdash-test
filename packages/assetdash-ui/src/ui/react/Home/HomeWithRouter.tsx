import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';

export const HomeWithRouter: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/watchlist" component={Home}/>
      <Route path="/:sectorName/:key">
        <Home/>
      </Route>
      <Route path="/" component={Home}/>
    </Switch>
  );
};
