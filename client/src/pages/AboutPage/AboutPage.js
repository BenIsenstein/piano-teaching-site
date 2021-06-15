import { useContext } from "react"
import { ColoredH1 } from "../../components/ColorSchemeWrapper/ColorSchemeModule"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"
import "./AboutPage.css"

const AboutPage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()

  return (
    <div className="About-page">
      <ColoredH1>About Page</ColoredH1>
    </div>

  
  )
}

export default AboutPage
