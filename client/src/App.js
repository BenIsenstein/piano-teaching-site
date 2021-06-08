import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AuthenticationProvider from './auth/AuthenticationProvider'
import LogInOrOut from './components/User/LogInOrOut'
import Homepage from './pages/Homepage/Homepage';


const App = () => {
  return (
    <Router>
      <AuthenticationProvider>  
        <Switch>
          <Route path="/">
            <Homepage />
          </Route>          
        </Switch> 
      </AuthenticationProvider>
    </Router>  
  )
}

export default App;
