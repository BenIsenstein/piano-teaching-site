import { useContext } from "react"
import { ColoredDiv } from "../../components/ColorSchemeWrapper/ColorSchemeModule"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const ContactPageProps = {
  style: {
    backgroundColor: '_color4',
    color: '_color5',
    border: '4px solid _color2',
    borderRadius: '2%',
    padding: '1%'  
  }
}

const ContactPage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()

  return (
    <ColoredDiv {...ContactPageProps}>
      Contact Page Testing Out Global Color Schemesery Context!! :))
    </ColoredDiv> 
  )
}



export default ContactPage