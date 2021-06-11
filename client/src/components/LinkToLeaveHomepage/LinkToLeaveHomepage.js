import { useContext } from 'react'
import { Link } from 'react-router-dom'
import SiteHomepageContext from '../../contexts/homepageContext/HomepageContext'

const LinkToLeaveHomepage = ({ children, ...props }) => 
  <Link 
    onClick={useContext(SiteHomepageContext).setDisplayedFalse} 
    to={props.to}
  >
    {children}
  </Link>

  
export default LinkToLeaveHomepage