import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SaveIcon from "@mui/icons-material/Save"
import { StudentsContext } from "../../contexts/StudentsContext"
import Tab from "../../components/tab/Tab"

const EditBehaviour = () => {

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
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${params.id}/getStudent`)
            if (!res.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await res.json()
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
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/behaviour`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ behaviour : editBehaviour})
        })
        if(res.ok) {
            getStudents()
            navigate("/behaviour")
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