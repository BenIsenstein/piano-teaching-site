import { useContext } from "react"
import ColorSchemeWrapper from "../../components/ColorSchemeWrapper/ColorSchemeWrapper"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const contactPageStyle = {
  backgroundColor: '_color4',
  color: '_color5',
  border: '4px solid _color2',
  borderRadius: '2%',
  padding: '1%'  
}

const ContactPage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()

  return (
    <ColorSchemeWrapper style={contactPageStyle}>
      Contact Page Testing Out Global Color Scheme Context!! :))
    </ColorSchemeWrapper> 
  )
}


export default ContactPage