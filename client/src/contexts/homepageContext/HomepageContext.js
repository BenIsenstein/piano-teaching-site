import React from 'react'

const SiteHomepageContext = React.createContext({
    isSiteHomepageDisplayed: true,
    setDisplayedTrue: () => {},
    setDisplayedFalse: () => {}
})

export default SiteHomepageContext