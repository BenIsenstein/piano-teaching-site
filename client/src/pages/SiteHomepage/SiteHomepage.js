import { useContext } from 'react'
import { ColoredH1 } from '../../components/ColorSchemeWrapper/ColorSchemeModule'
import LinkToLeaveHomepage from '../../components/LinkToLeaveHomepage/LinkToLeaveHomepage'
import AuthenticationContext from '../../contexts/auth/AuthenticationContext'
import SiteHomepageContext from '../../contexts/homepageContext/HomepageContext'
import "./SiteHomepage.css"

const Homepage = () => {
  useContext(SiteHomepageContext).setDisplayedTrue()
  const { username, isLoggedIn } = useContext(AuthenticationContext)
  
  const UserHomepageLink = () => 
    <LinkToLeaveHomepage to={{pathname: `/${username}`}}>My account</LinkToLeaveHomepage>
  
  return (  
    <div className="homepage-body">
      <ColoredH1 style={{color: "_color4"}}>
        My Website
      </ColoredH1>
      <div style={{display: 'flex'}}>
        <LinkToLeaveHomepage to="/about">        About</LinkToLeaveHomepage>
        <LinkToLeaveHomepage to="/my-philosphy"> Philosophy</LinkToLeaveHomepage>
        <LinkToLeaveHomepage to="/contact">      Contact</LinkToLeaveHomepage>
        {isLoggedIn && <UserHomepageLink />} 
      </div>
    </div>  
  )
}

export default Homepage
