import ColorSchemeWrapper from "./ColorSchemeWrapper"

const ColoredDiv = (props) => <ColorSchemeWrapper {...props} />

// All headers have a default backgroundColor of "_color2"
// and default tag tag of "h1"
const ColoredHeader = ({ style, ...props }) => {
  let headerStyle = { ...style }
  let headerProps = { ...props }

  if (!style?.backgroundColor) headerStyle.backgroundColor = "_color2"
  if (!props?.tag) headerProps.tag = "h1"

  headerProps = { ...headerProps, style: { ...headerStyle } }

  return <ColorSchemeWrapper {...headerProps} />
}

const ColoredH1 = (props) => <ColoredHeader tag="h1" {...props} />
const ColoredH2 = (props) => <ColoredHeader tag="h2" {...props} />
const ColoredH3 = (props) => <ColoredHeader tag="h3" {...props} />

// ColoredButton default to type "button"
// default backgroundColor is "_color3"
const ColoredButton = ({ style, ...props }) => {
  let buttonStyle = { ...style }
  let buttonProps = { ...props }

  if (!style?.backgroundColor) buttonStyle.backgroundColor = "_color3"
  if (!props?.type) buttonProps.type = "button"

  buttonProps.tag = "button"
  buttonProps = { ...buttonProps, style: { ...buttonStyle } }

  return <ColorSchemeWrapper {...buttonProps} />
}




export { ColoredDiv, ColoredH1, ColoredH2, ColoredH3, ColoredButton }
