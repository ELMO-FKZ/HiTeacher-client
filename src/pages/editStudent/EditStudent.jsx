import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SaveIcon from "@mui/icons-material/Save"
import Tab from "../../components/tab/Tab"
import initialize from "../../data/initialize"
import studentsInputs from "../../data/studentsInputs"
import useInform from "../../hooks/useInform"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"

const EditStudent = () => {

  const { classes } = useContext(ClassesContext)
  const { allStudents, getStudents } = useContext(StudentsContext)
  const [ editStudent, setEditStudent ] = useState(initialize)
  const params = useParams()
  const navigate = useNavigate()

  const studentsLinksEdit = [
    {name:"All Students", path:"/students"},
    {name:"Add Student", path:"/students/new"},
    {name:"Edit Student", path:`/students/edit/${params.id}/${params.code}`}
  ]

  const [ Dialog, inform ] = useInform(
    "Try again!",
    "A student with the same code already exists!",
  )

  async function getStudent() {
    try {
        const res = await fetch(`http://localhost:8000/api/classes/students/${params.id}/getStudent`)
        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }
        const jsonData = await res.json()
        setEditStudent(jsonData)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
  getStudent()
}, [])

const changeEditStudentHandler = (e) => { 
  e.preventDefault()
  let name = e.target.name
  let val = e.target.value
  setEditStudent({...editStudent, [name]:val})
}

const editStudentHandler = async(e) => {
  e.preventDefault()
  try {
    if(params.code != editStudent.code) {
      const isExist = allStudents?.some(itemStudent => itemStudent.code === editStudent.code)
      if (isExist) {
        await inform()
      } else {
        editSudent()
      }
    } else {
      editSudent()
    }
    } catch(error) {
        console.log(error)
    }
  }

  const editSudent = async() => {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${params.id}/updateStudent`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editStudent)
    })
    if(res.ok) {
      getStudents()
      navigate("/students")
    }
  }

  function submitEditStudentHandler(e) {
    editStudentHandler(e, editStudent.id)
    
  }

function formatDate(date){
    const originalDate = new Date(date)
    const dd = (originalDate.getDate() < 10 ? "0" : "") + originalDate.getDate()
    const MM = ((originalDate.getMonth() + 1) < 10 ? "0" : "") + (originalDate.getMonth() + 1)
    let yyyy = originalDate.getFullYear()
    return yyyy + "-" + MM + "-" + dd
}

  return (
    <>
    <div className="content-wrapper">
      <h1>Students</h1>
      <Tab tabLinks={studentsLinksEdit} />
      <form className="form" id="edit-student__form" method="" onSubmit={(e)=>submitEditStudentHandler(e)}>
        {
          studentsInputs.map((studentsInput) => {
            if (studentsInput.name === "gender"){
              return (
                <div className="form__section" key={studentsInput.name}>
                  <label className="label" htmlFor={studentsInput.id}>{studentsInput.label}<span className="required">*</span> :</label>
                  <select className="input" id={studentsInput.id} name={studentsInput.name} value={editStudent.gender}  onChange={changeEditStudentHandler} required>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              )
            } else if (studentsInput.name === "class") {
              return (
                <div className="form__section" key={studentsInput.name}>
                  <label className="label" htmlFor={studentsInput.id}>{studentsInput.label}<span className="required">*</span> :</label>
                  <select className="input" id={studentsInput.id} name={studentsInput.name} onChange={changeEditStudentHandler} value={editStudent.class} required >
                  {
                    classes?.map((doc) => {
                      return (
                        <option key={doc._id}>{doc.name}</option>
                      )
                    })
                  }
                  </select>
                </div>
              )
            } else {
              return (
                <div className="form__section" key={studentsInput.name}>
                  <label className="label" htmlFor={studentsInput.id}>{studentsInput.label}{studentsInput.required && <span className="required">*</span>} :</label>
                  <input className="input"
                    id={studentsInput.id}
                    type={studentsInput.type} 
                    placeholder={studentsInput.placeholder} 
                    name={studentsInput.name} 
                    value={studentsInput.type === "text" ? editStudent[`${studentsInput.name}`] : formatDate(editStudent[`${studentsInput.name}`]) }
                    onChange={changeEditStudentHandler}
                    required={studentsInput.required} 
                    autoComplete="false" />
                </div>
              )
            }
          })
        }
        <button className="btn small__btn--green" type="submit" id="submit" value="submit-edit-student" name="Submit-edit-student" > Save <SaveIcon/></button>
      </form>
    </div>
    <Dialog />
    </>
  )
}

export default EditStudent