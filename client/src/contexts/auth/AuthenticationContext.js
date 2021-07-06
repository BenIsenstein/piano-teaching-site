import React from 'react'

const AuthenticationContext = React.createContext({
    user: undefined,
    username: '',
    id: '',
    isAdministrator: false,
    isLoggedIn: false,
    isLoading: false,
    logIn: (username, isAdministrator) => {},
    logOut: () => {}
})

export default AuthenticationContext