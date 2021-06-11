import { useState } from "react"
import ColorSchemeContext from "./ColorSchemeContext"
import colorSchemeData from "./colorSchemeData"

const ColorSchemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(colorSchemeData["Lively and Inviting"])

  const setSchemeByName = (name) => {if (colorSchemeData[name]) setColorScheme(colorSchemeData[name])}

  let contextValue = {
    colorScheme,
    setColorScheme,
    setSchemeByName
  }

  return (
    <ColorSchemeContext.Provider value={ contextValue }>
      { children }
    </ColorSchemeContext.Provider>
  )
}

export default ColorSchemeProvider