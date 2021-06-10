import { useContext } from "react"
import ColorSchemeContext from "../../contexts/colorSchemeContext/ColorSchemeContext"

const ColorSchemeWrapper = ({ children, styleConfig}) => {
  // use ColorSchemeContext
  const colorContext = useContext(ColorSchemeContext)

  // define sensible className with the first key/value pair in styleConfig
  let semanticClassName = Object.keys(styleConfig)[0] 
                          + '-'                         
                          + Object.values(styleConfig)[0]

  // create style object using colors from colorContext -> 
  // it must be done this way as props can't be altered
  let dynamicStyle = {}

  for (let attribute in styleConfig) {
    let colorKey = styleConfig[attribute]  
    dynamicStyle[attribute] = colorContext.colorScheme[colorKey]
  }     

  //make children an array even when just a single child
  if (!Array.isArray(children)) children = [children]

  const wrappedChildren = children.map((child, index) => 
    <div
      key={semanticClassName + '-key' + index}
      className={semanticClassName} 
      style={dynamicStyle}
    >
      {child}
    </div> 
  )

  return wrappedChildren
}

export default ColorSchemeWrapper
