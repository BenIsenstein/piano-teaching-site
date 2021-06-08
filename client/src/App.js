import "./App.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import AuthenticationProvider from "./auth/AuthenticationProvider"
import LogInOrOut from "./components/User/LogInOrOut"
import Homepage from "./pages/Homepage/Homepage"
import ContactPage from "./pages/ContactPage/ContactPage"
import MyPhilosophyPage from "./pages/MyPhilosophyPage/MyPhilosophyPage"
import AboutPage from "./pages/AboutPage/AboutPage"
import SignupOrLoginPage from "./pages/SignupOrLoginPage/SignupOrLoginPage"

const App = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <Switch>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/my-philosphy">
            <MyPhilosophyPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <SignupOrLoginPage />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </AuthenticationProvider>
    </Router>
  )
}

export default App
