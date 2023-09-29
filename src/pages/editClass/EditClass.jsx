import { useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SaveIcon from "@mui/icons-material/Save"
import Tab from "../../components/tab/Tab"
import useInform from "../../hooks/useInform"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import { SERVER_URL } from "../../data/config"

const EditClass = () => {

  const params = useParams()
  const { classes, getClasses } = useContext(ClassesContext)
  const { getStudents } = useContext(StudentsContext)
  const [ editClass, setEditClass ] = useState(params.name)
  const navigate = useNavigate()

  const classesLinksEdit = [
    {id: 1, name:"All Classes", path:"/classes"},
    {id: 2, name:"Add Class", path:"/classes/new"},
    {id: 3, name:"Edit Class", path:`/classes/edit/${params.name}`}
  ]

  const [ Dialog, inform ] = useInform(
    "Try again!",
    "A class with the same name already exists!"
  )

  const changeEditClassHandler = (e) => {
    e.preventDefault()
    setEditClass(e.target.value)
  }

  const editClassHandler = async(e) => {
    e.preventDefault()
    try {
      const isExist = classes?.some(itemClass => itemClass.name === editClass)
      if (isExist) {
        const ans = await inform()
        if(!ans) {
          setEditClass("")
        }
      } else {
        const res = await fetch(`${SERVER_URL}/api/classes/${params.name}/updateClass`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editClass
          })
        })
        if(res.ok) {
          getClasses()
          getStudents()
          navigate("/classes")
        }
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className="content-wrapper">
      <h1>Classes</h1>
      <Tab tabLinks={classesLinksEdit} />
      <form className="form" id="edit-class__form" method="" onSubmit={(e) => editClassHandler(e)} >
        <div className="form__section">
          <label className="label" htmlFor="edit-class-name">Class name :</label>
          <input className="input"
            onChange={changeEditClassHandler}
            id="edit-class-name" 
            type="text" 
            placeholder="Enter a class name"
            value={editClass} 
            name="name" 
            required 
            autoComplete="false" />
        </div>
        <button className="btn small__btn--green" type="submit" id="submit-edit-class" value="submit" name="Submit-edit-class"> Save <SaveIcon/></button>
      </form>
    </div>
    <Dialog />
    </>
  )
}

export default EditClass