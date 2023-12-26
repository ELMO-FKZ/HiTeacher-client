import { useState, useContext, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { ClassesContext } from "../../contexts/ClassesContext"
import { addClassApi } from "../../api/api"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import Tab from "../../components/tab/Tab"
import useInform from "../../hooks/useInform"
import classesLinks from "../../variables/classesLinks"

function NewClass() {

  const [ newClass, setNewClass ] = useState("")
  const { classes, getClasses } = useContext(ClassesContext)
  const navigate = useNavigate()

  const [ Dialog, inform ] = useInform(
    "Try again!",
    "A class with the same name already exists!"
  )

  const changeNewClassHandler = (e) => {
    e.preventDefault()
    setNewClass(e.target.value)
  }

  const addNewClassHandler = useCallback(async(e) => {
    e.preventDefault()
    try {
      const isExist = classes?.some(itemClass => itemClass.name === newClass)
      if (isExist) {
        const ans = await inform()
        if(!ans) {
          setNewClass("")
        }
      } else {
        const response = await addClassApi(newClass)
        if(response.ok) {
          getClasses()
          setNewClass("")
          navigate("/classes")
        }
      }
    } catch(error) {
      console.log(error)
    }
}, [classes, newClass])

  return (
    <>
    <div className="content-wrapper">
      <h1>Classes</h1>
      <Tab tabLinks={classesLinks} />
      <form className="form" id="add-class__form form" method="" onSubmit={(e)=>addNewClassHandler(e)}>
        <div className="form__section">
          <label className="label" htmlFor="add-class-name">Class name :</label>
          <input className="input"
            id="add-class-name" 
            type="text" 
            placeholder="Enter a class name" 
            name="add-class-name" 
            value={newClass}
            onChange={changeNewClassHandler}
            required />
        </div>
        <button className="btn small__btn--green" type="submit" id="submit" value="submit-add-class" name="Submit-add-class" > Add <PlaylistAddIcon/></button>
      </form>
    </div>
    <Dialog />
    </>
  )
}

export default NewClass