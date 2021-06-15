import React, { useContext } from "react"
import ColorSchemeContext from "../../contexts/colorSchemeContext/ColorSchemeContext"

// ----- most common props: --------
// tag - defaults to 'div'. Can be any html tag that React recognizes, or any React component.
// style - inline, used to access the global color scheme through '_color1' syntax.
// NOTE: the only default style attribute is {backgroundColor: "_color1"}
// *Any other standard props are available ex. onClick, className

const ColorSchemeWrapper = ({ style, ...props }) => {
  // use ColorSchemeContext
  // define tagtag from props
  // define default className using the first key/value pair in style, or tagtag if no style
  const colorScheme = useContext(ColorSchemeContext).colorScheme
  const tagType = props.tag || 'div' 
  const semanticClassName = style 
    ? Object.entries(style)[0].join('-').replace(/(\s|_)/g, '') 
    : "Colored-" + tagType
                          
  // create new style object using colors from colorContext -> 
  // colorRegex to replace '_colorX' in style with the actual color codes
  // it must be done this way as props can't be altered
  // add, at the very least, a backgroundColor of "_color1"
  const dynamicStyle = {}
  const colorRegex = /_color(1|2|3|4|5)/g

  if (!style) style = {}
  if (!style.backgroundColor) style.backgroundColor = "_color1"

  for (let key in style) {
    dynamicStyle[key] = style[key].replace(colorRegex, (match) => colorScheme[match])
  }
  
  // wrap children and use dynamicStyle
  const propsForChildren = { 
    className: props.className || semanticClassName, 
    style: dynamicStyle,
    ...props
  }
  
  return React.createElement(tagType, propsForChildren, props.children) 
}

export default ColorSchemeWrapper
