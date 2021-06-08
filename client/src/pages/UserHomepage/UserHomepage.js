import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

const UserHomepage = () => {
  const { username } = useParams()
  const [user, setUser] = useState({
    username: "Loading..."
  })

  useEffect(() => {
    const fetchUser = async () => {
      let fetchUrl = `/api/user/single-user/${username}`

      try {
        let response = await fetch(fetchUrl)
        let resObject = await response.json()

        resObject.user ? setUser(resObject.user) : setUser(undefined)
      } catch(err) {
        console.log(`error fetching account '${username}':`, err)
        alert("There was an error loading your account. We're fixing it as fast as we can.")
      }
    }

    fetchUser()
  }, [username])

  return <div>{user?.username ? `${user.username}` : 'NOT FOUND'}</div>
}

export default UserHomepage
