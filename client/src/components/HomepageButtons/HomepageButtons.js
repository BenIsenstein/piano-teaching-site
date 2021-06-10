import { Link } from "react-router-dom"
import { useContext, useEffect } from 'react'
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"
import LogInOrOut from "../User/LogInOrOut"
import "../../pages/SiteHomepage/SiteHomepage.css"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const HomepageButtons = ({ style }) => {
  const homeContext = useContext(SiteHomepageContext)
  useEffect(() => console.log('isWebsiteHomepageDisplayed:', homeContext.isSiteHomepageDisplayed), [homeContext.isSiteHomepageDisplayed])

  const authContext = useContext(AuthenticationContext)
  const UserHomepageLink = () => <Link to={{pathname: `/${authContext.username}`}}>My account</Link>

  return (      
    <div className="homepage-buttons" style={style}>
      <LogInOrOut />
      {!homeContext.isSiteHomepageDisplayed && 
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Link onClick={homeContext.setDisplayedFalse} to="/">             Home</Link>
          {authContext.isLoggedIn && <UserHomepageLink />} 
          <Link onClick={homeContext.setDisplayedFalse} to="/about">        About</Link>
          <Link onClick={homeContext.setDisplayedFalse} to="/my-philosphy"> Philosophy</Link>
          <Link onClick={homeContext.setDisplayedFalse} to="/contact">      Contact</Link>
        </div>
      }
    </div>
  )
}

export default HomepageButtons
