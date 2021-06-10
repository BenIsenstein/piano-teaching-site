import HomepageButtons from "../HomepageButtons/HomepageButtons";
import './MenuOnLeft.css'

const MenuOnLeft = ({ children }) => (
  <div className='Menu-on-left'>
    <HomepageButtons />
    {children}  
  </div>
)


export default MenuOnLeft
