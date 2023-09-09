import { useState, useContext } from "react"
import StudentsTable from "../../components/studentsTable/StudentsTable"
import Tab from "../../components/tab/Tab"
import studentsLinks from "../../data/studentsLinks"
import { ClassesContext } from "../../contexts/ClassesContext"

const Students = () => {

  const [ studentSearch, setStudentSearch ] = useState("")
  const [ studentFilter, setStudentFilter ] = useState("All classes")
  const { classes } = useContext(ClassesContext)

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
    </div>
  )
}

export default Students