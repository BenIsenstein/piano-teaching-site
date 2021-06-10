import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import SiteHomepageContext from "./HomepageContext"

const SiteHomepageProvider = ({ children }) => {
  const [isSiteHomepageDisplayed, setIsSiteHomepageDisplayed] = useState(true)

  const setDisplayedTrue = () => setIsSiteHomepageDisplayed(true)

  const setDisplayedFalse = () => setIsSiteHomepageDisplayed(false)

  let contextValue = {
    isSiteHomepageDisplayed,
    setDisplayedTrue,
    setDisplayedFalse
  }

  return (
    <SiteHomepageContext.Provider value={ contextValue }>
        { children }
    </SiteHomepageContext.Provider>
  )
}

export default SiteHomepageProvider