import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationContext from '../../contexts/auth/AuthenticationContext'
import SiteHomepageContext from '../../contexts/homepageContext/HomepageContext'
import "./SiteHomepage.css"

const Homepage = () => {
  const authContext = useContext(AuthenticationContext)
  const homeContext = useContext(SiteHomepageContext)
  const UserHomepageLink = () => <Link to={{pathname: `/${authContext.username}`}}>My account</Link>

  homeContext.setDisplayedTrue()
  
  return (   
    <div className="homepage-body">
      <div style={{display: 'flex'}}>
        <Link onClick={homeContext.setDisplayedFalse} to="/about">        About</Link>
        <Link onClick={homeContext.setDisplayedFalse} to="/my-philosphy"> Philosophy</Link>
        <Link onClick={homeContext.setDisplayedFalse} to="/contact">      Contact</Link>
        {authContext.isLoggedIn && <UserHomepageLink />} 
      </div>
    </div>  
  )
}

export default Homepage
