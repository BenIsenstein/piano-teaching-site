import React, { useContext } from "react"
import ColorSchemeContext from "../../contexts/colorSchemeContext/ColorSchemeContext"

// ----- most common props: --------
// type - defaults to 'div'. Can be any html tag that React recognizes, or any React component.
// style - inline, used to access the global color scheme through '_color1' syntax.
// *Any other standard props are available ex. onClick, className

const ColorSchemeWrapper = ({ style, ...props }) => {
  // use ColorSchemeContext
  const colorScheme = useContext(ColorSchemeContext).colorScheme

  // colorRegex to replace '_colorX' in styleConfig with the actual color codes
  const colorRegex = /_color(1|2|3|4|5)/g

  // define sensible className using the first key/value pair in styleConfig
  const semanticClassName = style 
    ? Object.entries(style)[0].join('-').replace(/_/g, '') 
    : "Color-scheme-wrapper"
                          
  // create new style object using colors from colorContext -> 
  // it must be done this way as props can't be altered
  const dynamicStyle = {}

  for (let key in style) {
    dynamicStyle[key] = style[key].replace(colorRegex, (match) => colorScheme[match])
  }
  
  // wrap children and use dynamicStyle
  const propsForChildren = { 
    className: props.className || semanticClassName, 
    style: dynamicStyle,
    ...props
  }
  const tagType = props.type || 'div'
  const Wrapper = ({ children }) => React.createElement(tagType, propsForChildren, children)

  return <Wrapper>{props.children}</Wrapper>
}

export default ColorSchemeWrapper
