import { Link } from "react-router-dom"
import { useContext } from 'react'
import AuthenticationContext from "../../auth/AuthenticationContext"
import LogInOrOut from "../../components/User/LogInOrOut"
import "./Homepage.css"

const Homepage = () => {
  const authContext = useContext(AuthenticationContext)
  const isLoggedIn = authContext.username !== undefined
  const UserHomepageLink = () => <Link to={{pathname: `/user/${authContext.id}`}}>My account</Link>

  return (
    <div className="homepage">
      <div className="login-status-bar">
        <LogInOrOut />
      </div>
      <div className="homepage-body">
        <div className="homepage-buttons">
          <Link to="/about">About</Link>
          <Link to="/my-philosphy">Philosophy</Link>
          <Link to="/contact">Contact</Link>
          {isLoggedIn && <UserHomepageLink />} 
        </div>
      </div>
    </div>
  )
}

export default Homepage
