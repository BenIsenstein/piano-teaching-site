import React from 'react'

// UPDATE FOR GARDENING APP
const AuthenticationContext = React.createContext({
    username: '',
    isAdministrator: false,
    logIn: (username, isAdministrator) => {},
    logOut: () => {}
})

export default AuthenticationContext