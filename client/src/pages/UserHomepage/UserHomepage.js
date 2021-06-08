import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


const UserHomepage = () => {
    const { id } = useParams()
    const [user, setUser] = useState({
        username: 'Loading...'
    })

    useEffect(() => {
        const fetchUser = async () => {
            let fetchUrl = `/api/user/single-user/${id}`

            try {
                let response = await fetch(fetchUrl)
                let resObject = await response.json()

                resObject ? setUser(resObject.user) : setUser('no user')
            }
            catch(err) {
                console.log(`error fetching account ${id}:`, err)
                alert("There was an error loading your account. We're fixing it as fast as we can.")
            }
        }

        fetchUser()
    }, [id])

    return (
        <div>
            Account page for {user.username}
        </div>
    )
}

export default UserHomepage