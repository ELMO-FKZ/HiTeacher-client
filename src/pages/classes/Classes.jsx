import { useContext } from "react"
import { Link as LinkRouter } from "react-router-dom"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import useConfirm from "../../hooks/useConfirm"
import Tab from "../../components/tab/Tab"
import classesLinks from "../../variables/classesLinks"
import "./classes.css"

function Classes() {

  const { classes, getClasses } = useContext(ClassesContext)
  const { getStudents } = useContext(StudentsContext)

  const [ Dialog, confirmDelete ] = useConfirm(
    "Are you sure?",
    "deleting a class will result in deleting all related students!"
  )

  const deleteClassHandler = async(id, name) => {
    const ans = await confirmDelete()
    if (ans) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${id}/${name}/deleteClass`,
          {
            method: "DELETE"
          }
        )
        if (response.ok) {
          getClasses()
          getStudents()
        }
      } catch(error) {
          console.log(error)
      }
    } 
  }

  return (
    <>
    <div className="content-wrapper">
      <h1>Classes</h1>
      <Tab tabLinks={classesLinks} />
      {
        classes?.length !== 0
        ?
        <div className="class-cards">
          {
            classes?.map((doc, index) => {
              return (
                <div className="class-card" key={doc._id}>
                  <div className="class-card__students">
                    Class {index + 1} :
                  </div>
                  <div className="class-card__name">
                    {doc.name}
                  </div>
                  <div className="class-card__actions">
                    <LinkRouter className="small__btn small__btn--green" to={`/classes/edit/${doc.name}`} >Edit</LinkRouter>
                    <button className="small__btn small__btn--red" onClick={() => deleteClassHandler(doc._id, doc.name)} >Delete</button>  
                  </div>          
                </div>
              )
            })
          }
        </div>
        :
        <div className="class-empty">
          <div className="class-empty__title">Start managing your classes!</div>
          <div>Click the <LinkRouter className="class-empty__span" to="/classes/new" >Add Class</LinkRouter> tab to create your first class.</div>
        </div>
      }
      
    </div>
    <Dialog />
    </>
  )
}

export default Classes