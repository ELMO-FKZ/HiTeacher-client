import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import Tab from "../../components/tab/Tab"
import useConfirm from "../../hooks/useConfirm"
import useInform from "../../hooks/useInform"
import attendanceLinks from "../../data/attendanceLinks"
import deleteOptions from "../../data/deleteOptions"
import { SERVER_URL } from "../../data/config"
import "./deleteAttendance.css"

const DeleteAttendance = () => {

    const [ deleteAttOption, setDeleteAttOption ] = useState("")
    const [ deleteAttObj, setDeleteAttObj ] = useState({class: "All classes"})
    const { classes } = useContext(ClassesContext)
    const { getStudents } = useContext(StudentsContext)
    const navigate = useNavigate()

    const [ DialogConfirm, confirmDelete ] = useConfirm(
        "Are you sure?",
        "The selected records will be deleted permanently!"
    )

    const [ DialogInform, inform ] = useInform(
        "Try again!",
        "The selected records have not been deleted! make sure to fill all fields!"
    )

    const changeDeleteAttHandler = (e) => {
        let name = e.target.name
        let val = e.target.value
        if ( name == "deleteOption") {
            setDeleteAttOption(e.target.value)
        } else {
            setDeleteAttObj({...deleteAttObj, [name]: val})
        }
    }

    const deleteAttHandler = async(e) => {
        e.preventDefault()
        if (deleteAttOption == "option1" && deleteAttObj.class !== "All classes") {
            const attDate = deleteAttObj.date + "T00:00:00.000Z"
            const name = deleteAttObj.class
            const ans = await confirmDelete()
            if (ans) {
                try {
                    const response = await fetch(`${SERVER_URL}/api/classes/${name}/students/attendance/${attDate}/option1`,
                    {
                        method: "DELETE"
                    }
                    )
                    if (response.ok) {
                        getStudents()
                        navigate("/attendance")
                    }
                } catch(error) {
                    console.log(error)
                }
            }
        } else if (deleteAttOption == "option2" && deleteAttObj.class !== "All classes") {
            const name = deleteAttObj.class
            const ans = await confirmDelete()
            if (ans) {
                try {
                    const response = await fetch(`${SERVER_URL}/api/classes/${name}/students/attendance/option2`,
                        {
                            method: "DELETE"
                        }
                    )
                    if (response.ok) {
                        getStudents()
                        navigate("/attendance")
                    }
                } catch(error) {
                    console.log(error)
                }
            }
        } else if (deleteAttOption == "option3") {
            const ans = await confirmDelete()
            if (ans) {
                try {
                    const response = await fetch(`${SERVER_URL}/api/classes/students/attendance/option3`,
                        {
                            method: "DELETE"
                        }
                    )
                    if (response.ok) {
                        getStudents()
                        navigate("/attendance")
                    }
                } catch(error) {
                    console.log(error)
                }
            }
        } else {
            await inform()
        }
    }

    return (
        <>
        <div className="content-wrapper">
            <h1>Attendance</h1>
            <Tab tabLinks={attendanceLinks} />
            <div className="form">
                <div className="form__section">
                    <span className="label">Select a delete option :</span>
                    {
                        deleteOptions.map((deleteOption) => {
                            return (
                                <div className="delete__option" key={deleteOption.id}>
                                    <input
                                        type="radio"
                                        name="deleteOption"
                                        value={deleteOption.option}
                                        id={deleteOption.option}
                                        checked={deleteAttOption === `${deleteOption.option}`}
                                        onChange={e => changeDeleteAttHandler(e)} />
                                    <label className="delete__option-label" htmlFor={deleteOption.option}>{deleteOption.text}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <form id="delete-att__form" method="" onSubmit={(e)=>deleteAttHandler(e)}>
                    {
                        (deleteAttOption === "option1") &&
                        <div className="form__section">
                            <label className="label" htmlFor="delete-att-date">Choose a date</label>
                            <input className="input"
                                id="delete-att-date" 
                                type="date" 
                                placeholder="Enter a date" 
                                name="date" 
                                onChange={changeDeleteAttHandler}
                                required />
                        </div>
                    }
                    {
                        (deleteAttOption === "option1" || deleteAttOption === "option2") &&
                        <div className="form__section">
                            <label className="label" htmlFor="delete-att-class">Select a class</label>
                            <select className="input" id="delete-att-class" name="class" onChange={changeDeleteAttHandler} required>
                                <option>All classes</option>
                                {
                                    classes?.map((doc) => {
                                        return (
                                            <option key={doc._id}>{doc.name}</option>
                                    )})
                                }
                            </select>
                        </div>
                    }
                    <button className="small__btn--red btn" type="submit" id="submit" value="submit-delete-att" name="Submit-delete-att" > Delete <DeleteIcon /></button>
                </form>
            </div>
        </div>
        <DialogConfirm />
        <DialogInform />
        </>
    )
}

export default DeleteAttendance