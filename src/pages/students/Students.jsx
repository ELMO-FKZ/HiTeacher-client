import { useState, useContext } from "react"
import { Link as LinkRouter } from "react-router-dom"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import StudentsTable from "../../components/studentsTable/StudentsTable"
import Tab from "../../components/tab/Tab"
import studentsLinks from "../../variables/studentsLinks"

function Students() {

  const [ studentSearch, setStudentSearch ] = useState("")
  const [ studentFilter, setStudentFilter ] = useState("All classes")
  const { classes } = useContext(ClassesContext)
  const { allStudents } = useContext(StudentsContext)

  const changeSearchStudentHandler = (e) =>{
    setStudentSearch(e.target.value)
  }

  const changeFilterStudentHandler = (e) => {
    setStudentFilter(e.target.value)
  }

  return (
    <div className="content-wrapper">
      <h1>Students</h1>
      <Tab tabLinks={studentsLinks} />
      {
        (classes?.length === 0)
        ?
        <div className="class-empty">
          <div className="class-empty__title">Start managing your classes!</div>
          <div>Click <LinkRouter className="class-empty__span" to="/classes/new" >Add Class</LinkRouter> to create your first class.</div>
        </div>
        :
        (allStudents?.length === 0)
        ?
        <div className="class-empty">
          <div className="class-empty__title">Start managing your Students!</div>
          <div>Click <LinkRouter className="class-empty__span" to="/students/new" >Add Student</LinkRouter> to insert the information of your first student.</div>
        </div>
        :
        <>
        <div className="filter-container">
          <input className="filter-input" name="filter-input" type="text" placeholder="Search..." value={studentSearch} aria-label="search for students" onChange={e => changeSearchStudentHandler(e)} />
          <select className="filter-class" id="filter-class" name="filter-class" value={studentFilter} aria-label="select a class" onChange={e => changeFilterStudentHandler(e)} required>
            <option>All classes</option>
            {
              classes?.map((doc) => {
                return (
                  <option key={doc._id}>{doc.name}</option>
                )
              })
            }
          </select>
        </div>
        <StudentsTable studentFilter={studentFilter} studentSearch={studentSearch} />
        </>
      }
    </div>
  )
}

export default Students