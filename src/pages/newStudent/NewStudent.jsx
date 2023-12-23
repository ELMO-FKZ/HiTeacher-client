import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import Tab from "../../components/tab/Tab"
import initialize from "../../variables/initialize"
import studentsInputs from "../../variables/studentsInputs"
import studentsLinks from "../../variables/studentsLinks"
import genders from "../../variables/genders"
import useInform from "../../hooks/useInform"

function NewStudent() {

  const { classes } = useContext(ClassesContext)
  const { allStudents, getStudents } = useContext(StudentsContext)
  const [ newStudent, setNewStudent ] = useState(initialize)
  const navigate = useNavigate()

  const [ DialogOne, informOne ] = useInform(
    "Try again!",
    "Please make sure to fill all required fields!"
  )

  const [ DialogTwo, informTwo ] = useInform(
    "Try again!",
    "A student with the same code already exists!"
  )

  const addNewStudentHandler = async(e)=> {
    e.preventDefault()
    if(newStudent.class == "Choose a class" || newStudent.gender == "Choose a gender") {
      await informOne()
    } else {
      try {
        const isExist = allStudents?.some(itemStudent => itemStudent.code === newStudent.code)
        if (isExist) {
          await informTwo()
        } else {
          const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/addStudent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newStudent)
          })
          if(res.ok) {
            getStudents()
            e.target.reset()
            navigate("/students")
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const changeNewStudentHandler = (e) => {
    let name = e.target.name
    let val = e.target.value
    setNewStudent({...newStudent, [name]:val })
  }

  return (
    <>
    <div className="content-wrapper">
      <h1>Students</h1>
      <Tab tabLinks={studentsLinks} />
      <form className="form" id="add-student__form" method="" onSubmit={(e)=>addNewStudentHandler(e)} >
        {
          studentsInputs.map((studentsInput) => {
            if (studentsInput.name === "gender"){
              return (
                <div className="form__section" key={studentsInput.name}>
                  <label className="label" htmlFor={studentsInput.id}>{studentsInput.label}<span className="required">*</span> :</label>
                  <select className="input" id={studentsInput.id} name={studentsInput.name} onChange={(e) => changeNewStudentHandler(e)} value={newStudent.gender} required >
                    <option>Choose a gender</option>
                    {
                      genders.map((gender) => {
                        return (
                          <option key={gender.id}>{gender.type}</option>
                        )
                      })
                    }
                    
                  </select>
                </div>
              )
            } else if (studentsInput.name === "class") {
              return (
                <div className="form__section" key={studentsInput.name}>
                  <label className="label" htmlFor={studentsInput.id}>{studentsInput.label}<span className="required">*</span> :</label>
                  <select className="input" id={studentsInput.id} name={studentsInput.name} onChange={changeNewStudentHandler} value={newStudent.class} required >
                  <option>Choose a class</option>
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
                    onChange={changeNewStudentHandler}
                    required={studentsInput.required}
                    autoComplete="false" />
                </div>
              )
            }
          })
        }
        <button className="btn small__btn--green" type="submit" id="submit" value="submit-add-student" name="Submit-add-student" > Add <PlaylistAddIcon/></button>
      </form>
    </div>
    <DialogOne />
    <DialogTwo />
    </>
  )
}

export default NewStudent