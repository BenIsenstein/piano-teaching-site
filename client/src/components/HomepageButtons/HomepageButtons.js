import { Link } from "react-router-dom"
import { useContext, useEffect } from 'react'
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"
import LogInOrOut from "../User/LogInOrOut"
import "../../pages/SiteHomepage/SiteHomepage.css"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"
import LinkToLeaveHomepage from "../LinkToLeaveHomepage/LinkToLeaveHomepage"

const HomepageButtons = ({ style }) => {
  const homeContext = useContext(SiteHomepageContext)
  useEffect(() => console.log('isWebsiteHomepageDisplayed:', homeContext.isSiteHomepageDisplayed), [homeContext.isSiteHomepageDisplayed])

  const { username, isLoggedIn } = useContext(AuthenticationContext)
  const UserHomepageLink = () => 
    <LinkToLeaveHomepage to={{pathname: `/${username}`}}>My account</LinkToLeaveHomepage>

  return (      
    <div className="homepage-buttons" style={style}>
      <LogInOrOut />
      {!homeContext.isSiteHomepageDisplayed && 
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <LinkToLeaveHomepage to="/">             Home</LinkToLeaveHomepage>
          {isLoggedIn && <UserHomepageLink />} 
          <LinkToLeaveHomepage to="/about">        About</LinkToLeaveHomepage>
          <LinkToLeaveHomepage to="/my-philosphy"> Philosophy</LinkToLeaveHomepage>
          <LinkToLeaveHomepage to="/contact">      Contact</LinkToLeaveHomepage>
        </div>
      }
    </div>
  )
}

export default HomepageButtons
