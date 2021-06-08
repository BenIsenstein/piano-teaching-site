import React, { useContext } from "react"
import { Link } from "react-router-dom"
import AuthenticationContext from "../../auth/AuthenticationContext"

const LogInOrOut = () => {
  const authContext = useContext(AuthenticationContext)
  const isLoggedIn = authContext.username !== undefined

  return (
    <div style={{color: 'black'}}>
      {isLoggedIn 
        ? (
          <div>
            <span>Welcome {authContext.username} &nbsp;&nbsp; </span>
            <button className='logout-button' onClick={async () => await authContext.logOut()}>Logout</button>   
          </div>    
        ) 
        : (
          <button className='logout-button'>
            <Link to="/login">
              Login
            </Link>
          </button>
        )
      }
    </div>   
  )
}

export default LogInOrOut
