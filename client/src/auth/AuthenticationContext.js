import React from 'react'

const AuthenticationContext = React.createContext({
    username: '',
    id: '',
    isAdministrator: false,
    logIn: (username, isAdministrator) => {},
    logOut: () => {}
})

export default AuthenticationContext