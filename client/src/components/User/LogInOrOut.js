import React, { useContext } from "react"
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"
import { ColoredButton } from "../ColorSchemeWrapper/ColorSchemeModule"
import LinkToLeaveHomepage from "../LinkToLeaveHomepage/LinkToLeaveHomepage"

const LogInOrOut = () => {
  const authContext = useContext(AuthenticationContext)

  return (
    <div style={{color: 'black', width: 'max-content'}}>
      {authContext.isLoggedIn 
        ? (
          <div style={{display: 'flex'}}>
            <p>Welcome {authContext.username} &nbsp;&nbsp; </p>
            <ColoredButton className='logout-button' onClick={async () => await authContext.logOut()}>Logout</ColoredButton>    
          </div>    
        ) 
        : (
          <ColoredButton className='logout-button'>
            <LinkToLeaveHomepage to="/login">
              Login
            </LinkToLeaveHomepage>
          </ColoredButton>
        )
      }
    </div>   
  )
}

export default LogInOrOut
