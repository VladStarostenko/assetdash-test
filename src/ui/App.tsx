import React from 'react'
import '../styles/reset.sass'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './Home/Home'
import { Login } from './Login/Login'
import { SingUp } from './SignUp/SingUp'
import { ForgotPassword } from './ForgotPassword/ForgotPassword'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/sign-up" component={SingUp}/>
        <Route exact path="/forgot-password" component={ForgotPassword}/>
      </Switch>
    </Router>
  )
}

export default hot(App)
