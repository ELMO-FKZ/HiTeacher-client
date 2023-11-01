import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import CloseIcon from "@mui/icons-material/Close"
import useInform from "../../hooks/useInform"
import attendanceLinks from "../../data/attendanceLinks"
import Tab from "../../components/tab/Tab"

function NewAttendance() {

    const { classes } = useContext(ClassesContext)
    const { getStudents } = useContext(StudentsContext)
    const [ attClass, setAttClass ] = useState("All classes")
    const [ classStudents, setClassStudents ] = useState([])
    const [ isNext, setIsNext ] = useState(false)
    const today = new Date()
    const date = today.setDate(today.getDate())
    const defaultValue = new Date(date).toISOString().split("T")[0]
    const [ attDate, setAttDate ] = useState(defaultValue)
    const [ attTeachingHours, setAttTeachingHours ] = useState(0)
    const [ newAttValues, setNewAttValues ] = useState({})
    const navigate = useNavigate()

    const [ DialogOne, informOne ] = useInform(
        "Try again!",
        "Please make sure you have chose a class, and schedule hours!",
    )

    const [ DialogTwo, informTwo ] = useInform(
        "Try again!",
        "A record with the same date already exists!",
    )

    const [ DialogThree, informThree ] = useInform(
        "Try again!",
        "The record has not been added! make sure to fill all fields!",
    )

    async function getClassStudents() {
        try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${attClass}/students/getClassStudents`)
        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }
        const jsonData = await res.json()
        setClassStudents(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (attClass != "All classes") {
            getClassStudents()
        }
    }, [attClass])

    const changeAttScheduleHandler = (e) => {
        setAttTeachingHours(e.target.value)
    }

    const changeAttDateHandler = (e) => {
        setAttDate(e.target.value)
    }

    const changeNewFilterAttHandler = (e) => {
        setAttClass(e.target.value)
    }

    function formatDate(date) {
        if (!Number.isNaN(new Date(date).getTime())) {
            const originalDate = new Date(date)
            const formattedDate = originalDate.toISOString().split("T")[0]
            return formattedDate
        } else {
            return "0000-00-00"
        }
    }

    const nextAttHandler = async(e) => {
        let found = false
        e.preventDefault()
        if (attClass == "All classes" || attTeachingHours == 0) {
            await informOne()
        } else {
            for (let i = 0; i < classStudents?.length; i++) {
                for (let j = 0; j < classStudents[i].attendance.length; j++) {
                    if (formatDate(classStudents[i].attendance[j].date) == attDate && classStudents[i].class == attClass) {
                        found = true
                    }
                }
            }
            if (found) {
                await informTwo()
            } else {
                setIsNext(true)
            }
        }
    }

    const changeNewAttHandler = (e) => {
        let name = e.target.name
        let val = e.target.value
        setNewAttValues({...newAttValues, date: attDate, tHours: +attTeachingHours, [name]: +val})
    }

    const cancelNewAttHandler = () => {
        setIsNext(false)
        setAttTeachingHours(0)
        setAttDate(defaultValue)
        setAttClass("All classes")
        setNewAttValues({})
        navigate("/attendance/new")
    }

    const addNewAttHandler = async(e) => {
        e.preventDefault()
        if (Object.keys(newAttValues).length - 2 === classStudents?.length) {
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/${attClass}/students/attendance`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newAttValues)
                })
                if(res.ok) {
                    getStudents()
                    setIsNext(false)
                    setNewAttValues({})
                    navigate("/attendance")
                }
            } catch(error) {
                console.log(error)
            }
        } else {
            await informThree()
        }
    }

    return (
        <>
        <div className="content-wrapper">
            <h1>Attendance</h1>
            <Tab tabLinks={attendanceLinks} />
            { !isNext && 
            <>
            <span className="label" htmlFor="filter-hours">Specify the record infotmation :</span>
            <form className="form" method="" onSubmit={(e)=>nextAttHandler(e)}>
                <div className="form__section">
                    <label className="label" htmlFor="filter-hours">Schedule hours :</label>
                    <input className="input"
                        min={0}
                        max={12}
                        id="filter-hours"
                        type="number"
                        value={attTeachingHours}
                        onChange={e => changeAttScheduleHandler(e)} 
                        name="filter-hours" />
                </div>
                <div className="form__section">
                    <label className="label" htmlFor="filter-date">Choose a date :</label>
                    <input className="input"
                        id="filter-date"
                        type="date" 
                        placeholder="Choose a date"
                        name="filter-date" 
                        value={attDate}
                        onChange={e => changeAttDateHandler(e)} />
                </div>
                <div className="form__section">
                    <label className="label" htmlFor="filter-class">Select a class :</label>
                    <select className="input" id="filter-class" name="filter-class" value={attClass} onChange={e => changeNewFilterAttHandler(e)} >
                    <option>All classes</option>
                        {
                        classes?.map((doc) => {
                            return (
                                <option key={doc._id}>{doc.name}</option>
                            )})
                        }
                    </select>
                </div>
                <button className="btn small__btn--green" type="submit" id="submit" value="next-delete-att" name="next-delete-att" > Next <ArrowForwardIosIcon /></button>
            </form>
            </>
            }
            { isNext && 
            <>
            <span className="label" htmlFor="filter-hours">Fill the absence hours :</span>
            <div className="table-container" >
                <table className="table">
                    <thead className="table__thead">
                        <tr>
                            <th className="thead__th">First Name</th>
                            <th className="thead__th">Last Name</th>
                            <th className="thead__th">Class</th>
                            <th className="thead__th">Absence (h)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classStudents?.map((student) => {
                                return (
                                    (attClass == student.class) && 
                                    <tr className="tbody__tr" key={student.code} >
                                        <td className="tbody__td">{student.firstName}</td>
                                        <td className="tbody__td">{student.lastName}</td>
                                        <td className="tbody__td">{student.class}</td>
                                        <td className="tbody__td">
                                            <input className="tbody__td-input"
                                                min={0}
                                                max={attTeachingHours}
                                                id={student._id}
                                                name={student._id}
                                                onChange={e => changeNewAttHandler(e)}
                                                aria-label="fill the absence hours"
                                                type="number"
                                                required />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot className="table__tfoot">
                        <tr>
                            <td className="tfoot__td">
                            </td>
                            
                        </tr>
                    </tfoot>
                </table>
                <div className="buttons-container">
                    <button className="btn small__btn--green mr-1" type="submit" onClick={(e) => addNewAttHandler(e)}> Add <PlaylistAddIcon/></button>
                    <button className="btn small__btn--red" type="button" onClick={() => cancelNewAttHandler()}> Cancel <CloseIcon/></button>
                </div>
            </div>
            </>
            }
        </div>
        <DialogOne />
        <DialogTwo />
        <DialogThree />
        </>
    )
}

export default NewAttendance