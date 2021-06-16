import { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { ColoredButton } from "../../components/ColorSchemeWrapper/ColorSchemeModule"
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"
import SiteHomepageContext from "../../contexts/homepageContext/HomepageContext"
import PaymentsTab from "./PaymentsTab"
import SettingsTab from "./SettingsTab"
import StudentsTab from "./StudentsTab"

const UserHomepage = () => {
  useContext(SiteHomepageContext).setDisplayedFalse()
  const authContext = useContext(AuthenticationContext)
  const { username } = useParams()
  const [user, setUser] = useState()
  const [view, setView] = useState("students")
  const history = useHistory()
  const isCorrectUser = authContext.username === username

  console.log('auth context user: ', authContext.user)
  
  useEffect(() => {
    if (authContext.isLoading) return

    if (isCorrectUser) {setUser(authContext.user)} 
    else {alert("No authorization for this page."); history.push('/')}

  }, [authContext.user, isCorrectUser, authContext.isLoading, history])

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex'}}>
        <ColoredButton onClick={() => setView("students")}>Students</ColoredButton>
        <ColoredButton onClick={() => setView("payments")}>Payments</ColoredButton>
        <ColoredButton onClick={() => setView("settings")}>Settings</ColoredButton>
      </div>
      {view === "students" && user && <StudentsTab />} 
      {view === "payments" && user && <PaymentsTab />}
      {view === "settings" && user && <SettingsTab />}
    </div>
  )
}

export default UserHomepage