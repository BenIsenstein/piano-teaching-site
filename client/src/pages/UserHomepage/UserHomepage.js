import { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { ColoredH1 } from "../../components/ColorSchemeWrapper/ColorSchemeModule"
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const UserHomepage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()

  const { username } = useParams()
  const [user, setUser] = useState({username: "Loading..."})
  const history = useHistory()
  const isProperUser = useContext(AuthenticationContext).username === username
  
  useEffect(() => {
    const handleNoPage = () => {alert("This page does not exist."); history.push('/')}
    const handleImproperUser = () => {alert("You are not authorized to view this page."); history.push('/')}
    const handleAuth = user => isProperUser ? setUser(user) : handleImproperUser()

    const fetchUser = async () => {
      let fetchUrl = `/api/user/single-user/${username}`

      try {
        let response = await fetch(fetchUrl)
        let resObject = await response.json()

        if (resObject.user) handleAuth(resObject.user)
        else handleNoPage()

      } catch(err) {
        console.log(`error fetching account '${username}':`, err)
        alert("There was an error loading your account. We're fixing it as fast as we can.")
      }
    }

    fetchUser()
  }, [username, history, isProperUser])

  return <ColoredH1 style={{color: "_color3"}}>{user.username}</ColoredH1> 
}

export default UserHomepage