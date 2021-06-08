import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthenticationContext from './AuthenticationContext'

// UPDATE FOR GARDENING APP
const AuthenticationProvider = ({ children }) => {
    let history = useHistory()
    const goBack = () => history.goBack()

    const [username, setUsername] = useState()
    const [isAdministrator, setIsAdministrator] = useState(false)

    useEffect(() => {
      const checkLoggedInUser = async () => {
        try {
          let response = await fetch('/api/user/getloggedinuser')
          let resObject = await response.json()

          if (resObject.user) {setUsername(resObject.user.username)}
        }
        catch(err) {
          console.log(err)
          alert("There was an error checking your login status. We're fixing it as fast as we can.")
        }
      }

      checkLoggedInUser()
    }, [])

    const logIn = async (data) => {
      let fetchUrl = "/api/user/login"
      let fetchOptions = {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      }

      try {
        let response = await fetch(fetchUrl, fetchOptions)

        // they tried to log in, but passport authentication failed
        if (response.status === 401) {return alert('Unable to log in. Please make sure your login info is correct.')}
          
        // parse the response as JSON since we're sure it has a value
        let resObject = await response.json()  

        // they are already logged in
        if (resObject.isAlreadyLoggedIn) {alert('You are already logged in. Please log out before logging in as a different gardener.')}
        
        // success logging in server-side
        else {setUsername(resObject.username); goBack()}
      }
      catch(err) {
        // reset context
        setUsername(undefined)

        // logout the user server-side, incase they got logged in before error occurred in the code block
        try {await fetch('/api/user/logout')} 
        catch(err) {console.log('error logging out: ', err)}
        
        // log error and communicate with user
        console.log('Error sending fetch to login router: ', err)
        alert("There was an error logging you in. We're fixing it as fast as we can.")
      } 
    }

    const logOut = async () => {
      try {
        let response = await fetch("/api/user/logout")
        let resObject = await response.json()
  
        if (resObject.isLoggedOutNow) {setUsername(undefined)}
        else {alert('You are still logged in for some reason. Please try logging out again.')}
      }
      catch(err) {
        console.log(`Error logging out user ${username}: `, err)
        alert("There was an error logging you out. We're fixing it as fast as we can.")
      }
    }

    let contextValue = {
        username, 
        isAdministrator,
        logIn,
        logOut
    }

    return (
        <AuthenticationContext.Provider value={ contextValue }>
            { children }
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationProvider
