import { useContext } from "react"
import StudentDisplayCard from "../../components/StudentTab/StudentDisplayCard/StudentDisplayCard"
import AuthenticationContext from "../../contexts/auth/AuthenticationContext"

const StudentsTab = (props) => {
  const authContext = useContext(AuthenticationContext)
  const isAuthLoaded = !authContext.isLoading
  const students = authContext.user.students
  let StudentCards = undefined
  
  if (isAuthLoaded) 
    StudentCards = students.map((item, index) => 
      <StudentDisplayCard name={item.student.name} key={index} />
    )

  let areThereStudents = StudentCards?.length > 0
  let noStudentsMessage = "You have no students!"
  let noStudentsCard = <StudentDisplayCard name={noStudentsMessage} />

  return areThereStudents ? StudentCards : noStudentsCard
}

export default StudentsTab
