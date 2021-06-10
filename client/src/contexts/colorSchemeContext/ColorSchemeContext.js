import React from 'react'
import colorSchemeData from "./colorSchemeData"

const ColorSchemeContext = React.createContext({
    colorScheme: colorSchemeData["Purple Tints And Tones"],
    setColorScheme: () => {},
    setColorSchemeByName: (name) => {}
})

export default ColorSchemeContext