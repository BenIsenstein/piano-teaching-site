import { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import ColorSchemeWrapper from "../../components/ColorSchemeWrapper/ColorSchemeWrapper"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const UserHomepage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()

  const { username } = useParams()
  const [user, setUser] = useState({username: "Loading..."})
  const history = useHistory()
  
  useEffect(() => {
    const handleNoPage = () => {alert("This page does not exist."); history.push('/')}
    
    const fetchUser = async () => {
      let fetchUrl = `/api/user/single-user/${username}`

      try {
        let response = await fetch(fetchUrl)
        let resObject = await response.json()

        if (resObject.user) setUser(resObject.user)
        else handleNoPage()

      } catch(err) {
        console.log(`error fetching account '${username}':`, err)
        alert("There was an error loading your account. We're fixing it as fast as we can.")
      }
    }

    fetchUser()
  }, [username, history])

  return <ColorSchemeWrapper type="h1" style={{color: "_color3"}}>{user.username}</ColorSchemeWrapper> 
}

export default UserHomepage