import { useState, useContext } from "react"
import { Link as LinkRouter } from "react-router-dom"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import useConfirm from "../../hooks/useConfirm"
import behaviourLinks from "../../variables/behaviourLinks"
import Tab from "../../components/tab/Tab"

function Behaviour() {

  const [ studentFilter, setStudentFilter ] = useState("All classes")
  const { classes } = useContext(ClassesContext)
  const { allStudents, getStudents } = useContext(StudentsContext)

  const [ Dialog, confirmDelete ] = useConfirm(
    "Are you sure?",
    "The student's behaviour will be deleted permanently!"
  )

  const changeFilterStudentHandler = (e) => {
    setStudentFilter(e.target.value)
  }

  const deleteBehaviourHandler = async(id) => {
    const ans = await confirmDelete()
    if(ans) {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/behaviour`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ behaviour : ""})
      })
      if(res.ok) {
        getStudents()
      }
    }
  }

  return (
    <>
    <div className="content-wrapper">
      <h1>Behaviours & Skills</h1>
      <Tab tabLinks={behaviourLinks} />
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
        <div className="table-container" >
          <table className="table">
            <thead className="table__thead">
              <tr>
                <th className="thead__th">First Name</th>
                <th className="thead__th">Last Name</th>
                <th className="thead__th">Class</th>
                <th className="thead__th">Behaviours</th>
              </tr>
            </thead>
            <tbody>
              {
                allStudents?.map((student) => {
                  return (
                    (studentFilter == "All classes" || studentFilter == student.class) &&
                    <tr className="tbody__tr" key={student._id} >
                      <td className="tbody__td">{student.firstName}</td>
                      <td className="tbody__td">{student.lastName}</td>
                      <td className="tbody__td">{student.class}</td>
                      <td className="tbody__td">
                        { student.behaviour == "" && <LinkRouter className="small__btn small__btn--green" to={`/behaviour/new/${student._id}`} >Add</LinkRouter> }
                        { student.behaviour !== "" && <LinkRouter className="small__btn small__btn--yellow" to={`/behaviour/view/${student._id}`} >View</LinkRouter> }
                        { student.behaviour !== "" && <LinkRouter className="small__btn small__btn--green" to={`/behaviour/edit/${student._id}`} >Edit</LinkRouter> }
                        { student.behaviour !== "" && <button className="small__btn small__btn--red" onClick={() => deleteBehaviourHandler(student._id)} >Delete</button> }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        </>
      }
    </div>
    <Dialog />
    </>
  )
}

export default Behaviour