import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import { StudentsContext } from "../../contexts/StudentsContext"
import Tab from "../../components/tab/Tab"

const NewBehaviour = () => {

    const [ student, setStudent ] = useState()
    const [ newBehaviour, setNewBehaviour ] = useState("")
    const { getStudents } = useContext(StudentsContext)
    const navigate = useNavigate()
    const params = useParams()

    const behaviourLinksNew = [
        {id: 1, name:"All behaviours", path:"/behaviour"},
        {id: 2, name:"Add behaviours", path:`/behaviour/new/${params.id}`}
    ]

    async function getStudent() {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${params.id}/getStudent`)
            if (!res.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await res.json()
            setStudent(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStudent()
    }, [])

    const changeNewBehaviourHandler = (e) => {
        e.preventDefault()
        setNewBehaviour(e.target.value)
    }

    const addNewBehaviourHandler = async(e, id) => {
        e.preventDefault()
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/${id}/behaviour`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ behaviour : newBehaviour})
        })
        if(res.ok) {
            getStudents()
            navigate("/behaviour")
        }
    }

    return (
    <div className="content-wrapper">
        <h1>Behaviours & Skills</h1>
        <Tab tabLinks={behaviourLinksNew} />
        <form className="form" id="add-behaviour__form" method="" onSubmit={(e) => addNewBehaviourHandler(e, params.id)}>
            <div className="form__section">
                <span className="view-student__item-name" >Full name</span>
                <div className="view-student__item-value" >{student?.firstName} {student?.lastName}</div>
            </div>
            <div className="form__section">
                <textarea className="input"
                    data-gramm="false"
                    id="add-behaviour-name" 
                    type="text" 
                    aria-label="Enter behaviours and skills"
                    placeholder="Enter behaviours and skills"
                    name="add-behaviour-name" 
                    onChange={changeNewBehaviourHandler}
                    rows="10"
                    required >
                </textarea>
            </div>
            <button className="btn small__btn--green" type="submit" id="submit" value="submit-behaviour-class" name="Submit-behaviour-class" > Add <PlaylistAddIcon/></button>
        </form>
    </div>
    )
}

export default NewBehaviour