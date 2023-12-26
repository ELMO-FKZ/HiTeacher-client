import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { StudentsContext } from "../../contexts/StudentsContext"
import { editBehaviourApi, getStudentApi } from "../../api/api"
import SaveIcon from "@mui/icons-material/Save"
import Tab from "../../components/tab/Tab"

function EditBehaviour() {

    const [ student, setStudent ] = useState()
    const [ editBehaviour, setEditBehaviour ] = useState("")
    const { getStudents } = useContext(StudentsContext)
    const navigate = useNavigate()
    const params = useParams()

    const behaviourLinksEdit = [
        {id: 1, name:"All behaviours", path:"/behaviour"},
        {id: 2, name:"Edit behaviours", path:`/behaviour/edit/${params.id}`}
    ]

    async function getStudent() {
        try {
            const response = await getStudentApi(params.id)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await response.json()
            setStudent(jsonData)
            setEditBehaviour(jsonData.behaviour)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStudent()
        setEditBehaviour(student?.behaviour)
    }, [])

    const changeEditBehaviourHandler = (e) => {
        e.preventDefault()
        setEditBehaviour(e.target.value)
    }

    const editBehaviourHandler = async(e, id) => {
        e.preventDefault()
        try {
            const response = await editBehaviourApi(id, editBehaviour)
            if(response.ok) {
                getStudents()
                navigate("/behaviour")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="content-wrapper">
            <h1>Behaviours & Skills</h1>
            <Tab tabLinks={behaviourLinksEdit} />
            <form className="form" id="edit-behaviour__form" method="" onSubmit={(e)=>editBehaviourHandler(e, params.id)}>
                <div className="form__section">
                    <span className="view-student__item-name" >Full name :</span>
                    <div className="view-student__item-value" >{student?.firstName} {student?.lastName}</div>
                </div>
                <div className="form__section">
                    <textarea className="input"
                        data-gramm="false"
                        id="add-behaviour-name" 
                        type="text" 
                        aria-label="Enter behaviours and skills"
                        placeholder="Enter behaviours and skills"
                        name="behaviour" 
                        onChange={changeEditBehaviourHandler}
                        value={editBehaviour} 
                        rows="10"
                        required >
                    </textarea>
                </div>
                <button className="btn small__btn--green" type="submit" id="submit" value="edit-behaviour-class" name="Edit-behaviour-class" > Save <SaveIcon /></button>
            </form>
        </div>
    )
}

export default EditBehaviour