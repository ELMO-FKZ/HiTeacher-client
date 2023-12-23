import { useEffect, useContext } from "react"
import { ClassesContext } from "./contexts/ClassesContext"
import { StudentsContext } from "./contexts/StudentsContext"
import AppRoutes from "./routes/AppRoutes"

function App() {

  const { getClasses } = useContext(ClassesContext)
  const { getStudents } = useContext(StudentsContext)

  useEffect(() => {
    getClasses()
  }, [])

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <AppRoutes />
  )
}

export default App