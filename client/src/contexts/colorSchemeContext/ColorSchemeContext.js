import React from 'react'

const ColorSchemeContext = React.createContext({
    colorScheme: undefined,
    setColorScheme: () => {},
    setColorSchemeByName: (name) => {}
})

export default ColorSchemeContext