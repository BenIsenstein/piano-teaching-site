import { useContext } from "react"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"

const MyPhilosophyPage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()

  return(<div>My Philosphy Page</div>)
}

export default MyPhilosophyPage