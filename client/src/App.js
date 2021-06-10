import "./App.css"

import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

import AuthenticationProvider from "./contexts/auth/AuthenticationProvider"
import WebsiteHomepage from "./pages/SiteHomepage/SiteHomepage"
import ContactPage from "./pages/ContactPage/ContactPage"
import MyPhilosophyPage from "./pages/MyPhilosophyPage/MyPhilosophyPage"
import AboutPage from "./pages/AboutPage/AboutPage"
import SignupOrLoginPage from "./pages/SignupOrLoginPage/SignupOrLoginPage"
import UserHomepage from "./pages/UserHomepage/UserHomepage"
import MenuOnLeft from "./components/MenuOnLeft/MenuOnLeft"
import SiteHomepageProvider from "./contexts/homepageContext/HomepageProvider"

const App = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <SiteHomepageProvider>
          <MenuOnLeft>
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
              <Route path="/:username">
                <UserHomepage />
              </Route>
              <Route path="/">
                <WebsiteHomepage />
              </Route>
            </Switch>
          </MenuOnLeft>
        </SiteHomepageProvider>
      </AuthenticationProvider>
    </Router>
  )
}

export default App
