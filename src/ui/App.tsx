import React from 'react';
import '../styles/reset.sass';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './Home/Home';
import { Login } from './Login/Login';
import { SingUp } from './SignUp/SingUp';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';
import { ThemeContextProvider } from './Theme/ThemeContextProvider';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/sign-up" component={SingUp}/>
          <Route exact path="/forgot-password" component={ForgotPassword}/>
        </Switch>
      </Router>
    </ThemeContextProvider>
  );
};

export default hot(App);
