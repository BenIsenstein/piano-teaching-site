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
import ColorSchemeProvider from "./contexts/colorSchemeContext/ColorSchemeProvider"
import ColorSchemeWrapper from "./components/ColorSchemeWrapper/ColorSchemeWrapper"

const App = () => {
  return (
    <Router>
      <ColorSchemeProvider>
        <AuthenticationProvider>
          <SiteHomepageProvider>
            <ColorSchemeWrapper className="App-wrapper" style={{border: "4px dotted _color4"}}>
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
            </ColorSchemeWrapper>
          </SiteHomepageProvider>
        </AuthenticationProvider>
      </ColorSchemeProvider>
    </Router>
  )
}

export default App
