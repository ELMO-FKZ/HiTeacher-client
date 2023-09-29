import { useState, useContext } from "react"
import useInform from "../../hooks/useInform"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import attendanceLinks from "../../data/attendanceLinks"
import Tab from "../../components/tab/Tab"

const Attendance = () => {

  const today = new Date()
  const date = today.setDate(today.getDate())
  const defaultValue = new Date(date).toISOString().split("T")[0]
  const [ attDate, setAttDate ] = useState(defaultValue)
  const { classes } = useContext(ClassesContext)
  const { allStudents, getStudents } = useContext(StudentsContext)
  const [ attFilter, setAttFilter ] = useState("All classes")
  const [ studentId, setStudentId ] = useState("")
  const [ isEditing, setIsEditing ] = useState(false)
  const [ attObj, setAttObj ] = useState({})

  const [ Dialog, inform ] = useInform(
    "Try again!",
    "There is no record to edit!"
  )

  function checkFormatDate(date) {
    if (!Number.isNaN(new Date(date).getTime())) {
      const originalDate = new Date(date)
      const formattedDate = originalDate.toISOString().split("T")[0]
      return formattedDate
    } else {
      return "0000-00-00"
    }
  }

  const changeAttDateHandler = (e) => {
    setAttDate(checkFormatDate(e.target.value))
    setStudentId("")
  }

  const changeFilterAttHandler = (e) => {
    setAttFilter(e.target.value)
  }

  const checkRecord = async(student) => {
    if ( student.attendance.length == 0 ) {
        setIsEditing(false)
        setStudentId("")
        await inform()
    } else {
      let count = 0
      for(let i= 0; i < student.attendance.length ; i++) {
        if (checkFormatDate(student.attendance[i].date) == attDate) {
            setAttObj({studentId: student._id, attId: student.attendance[i]._id, date: attDate, tHours : student.attendance[i].tHours, aHours: student.attendance[i].aHours})
            setStudentId(student._id)
            setIsEditing(true)
            count = 1
            break
        }
      }
      if (count == 0) {
        setIsEditing(false)
        setStudentId("")
        await inform()
      }
    }
  }

  const cancelEditAttHandler = () => {
    setStudentId("")
  }

  const changeEditAttHandler = (e) => {
    let name = e.target.name
    let val = e.target.value
    e.preventDefault()
    setAttObj({...attObj, [name] : +val})
  }

  const editAttHandler = async() => {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${attObj.studentId}/attendance/${attObj.attId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attObj)
    })
    if(res.ok) {
      getStudents()
      setStudentId("")
    }
  }

  return (
    <>
    <div className="content-wrapper">
      <h1>Attendance</h1>
      <Tab tabLinks={attendanceLinks} />
      <div className="filter-container">
        <input className="filter-input"
          id="filter-date"
          type="date" 
          placeholder="Choose a date"
          name="filter-date" 
          value={attDate}
          aria-label="select a date"
          onChange={e => changeAttDateHandler(e)} />
        <select className="filter-class" id="filter-class" name="filter-class" value={attFilter} aria-label="select a class" onChange={e => changeFilterAttHandler(e)} >
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
              <th className="thead__th">Schedule (h)</th>
              <th className="thead__th">Absence (h)</th>
              <th className="thead__th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              allStudents?.map(student => {
                return (
                  (attFilter == "All classes" || attFilter == student.class) &&
                  <tr className="tbody__tr" key={student.code} >
                    <td className="tbody__td">{student.firstName}</td>
                    <td className="tbody__td">{student.lastName}</td>
                    <td className="tbody__td">{student.class}</td>
                    <td className="tbody__td">
                      {
                        ( studentId !== student._id ) &&
                        <span className="tbody__td-span">
                        {
                          student.attendance.map(docAtt => {
                            if(checkFormatDate(docAtt?.date) == attDate) {
                              return docAtt.tHours
                            }
                          })
                        }
                      </span>
                      }
                      {
                        ( studentId == student._id && isEditing ) &&
                        <input className="tbody__td-input"
                          id={`${student.id}-tHours`}
                          name="tHours"
                          value={attObj.tHours}
                          onChange={e => changeEditAttHandler(e)}
                          type="number" />
                      }
                    </td>
                    <td className="tbody__td">
                      {
                        ( studentId !== student._id ) &&
                        <span className="tbody__td-span">
                        {
                          student.attendance.map(docAtt => {
                            if(checkFormatDate(docAtt.date) == attDate) {
                              return docAtt.aHours
                            }
                          })
                        }
                      </span>
                      }
                      {
                        ( studentId == student._id && isEditing ) &&
                        <input className="tbody__td-input"
                          id={`${student.id}-aHours`}
                          name="aHours"
                          value={attObj.aHours}
                          onChange={e => changeEditAttHandler(e)}
                          type="number" />
                      }
                    </td>
                    <td className="tbody__td">
                      {( studentId !== student._id) && <button className="small__btn small__btn--green" onClick={() => checkRecord(student)} >Edit</button> }
                      {( studentId == student._id && isEditing ) && <button className="small__btn small__btn--green" onClick={() => editAttHandler()} >Save</button> }
                      {( studentId == student._id && isEditing ) && <button className="small__btn small__btn--red" onClick={() => cancelEditAttHandler()} >Cancel</button> }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
    <Dialog />
    </>
  )
}

export default Attendance