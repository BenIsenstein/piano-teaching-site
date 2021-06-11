import { useContext } from "react"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const AboutPage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()

  return <div>About Page</div>
}

export default AboutPage
