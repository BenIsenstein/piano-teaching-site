import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"
import WebsiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const LogInOrOut = () => {
  const authContext = useContext(AuthenticationContext)
  const homeContext = useContext(WebsiteHomepageContext)

  return (
    <div style={{color: 'black', width: 'max-content'}}>
      {authContext.isLoggedIn 
        ? (
          <div style={{display: 'flex'}}>
            <p>Welcome {authContext.username} &nbsp;&nbsp; </p>
            <button className='logout-button' onClick={async () => await authContext.logOut()}>Logout</button>    
          </div>    
        ) 
        : (
          <button className='logout-button'>
            <Link to="/login" onClick={homeContext.setDisplayedFalse}>
              Login
            </Link>
          </button>
        )
      }
    </div>   
  )
}

export default LogInOrOut
