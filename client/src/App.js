import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'


import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/mainSection/Dashboard'
import NotFound from './components/common/NotFound'
import SendMailMessage from './components/resetPassword/SendMailMessage'
import Statement from './components/mainSection/Statement'
import ChangePassword from './components/mainSection/ChangePassword'
import NewPassword from './components/resetPassword/NewPassword'
import AccountInfo from './components/mainSection/AccountInfo'
import setAuthToken from './utils/setAuthToken';
import { logOut, currentUser } from './actions/authActions' 
import{addStatement} from './actions/statementActions'
import store from './store'
import authGourd from './components/HOCS/authGuard'
import ResetPass from './components/resetPassword/ResetPass'


const jwtToken = localStorage.getItem('jwtToken')

//Logout
if (jwtToken) {
  setAuthToken(jwtToken)
  store.dispatch(currentUser(jwtToken))

  const decoded = jwt_decode(jwtToken)
  const currentTime =Date.now() / 1000
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logOut())
    //Redirect to Login
    window.location.href='/'
  }
}
    

//Store statement
var now = new Date()
var localTime = now.toLocaleTimeString()
if (localTime >= "11:59:57 PM" && localTime <= "11:59:59 PM"){
  store.dispatch(addStatement())
  store.dispatch(logOut())
    }


class App extends Component{
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={authGourd(Dashboard)} />
          <Route exact path="/statement" component={authGourd(Statement)} />
          <Route exact path="/changepassword" component={authGourd(ChangePassword)} />
          <Route exact path="/myaccount" component={authGourd(AccountInfo)} />
          <Route exact path="/resetpassword" component={ResetPass} />
          <Route exact path="/sendmailmessage" component={SendMailMessage} />
          <Route exact path="/reset/:token" component={NewPassword} />
          <Route exact path="/" component={Landing} />
          <Route component={NotFound} />
            </Switch>
        </Router>
        </div>
    )
  }
}


export default App;
