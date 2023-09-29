import { useContext, memo } from "react"
import { Link as LinkRouter } from "react-router-dom"
import useConfirm from "../../hooks/useConfirm"
import { StudentsContext } from "../../contexts/StudentsContext"
import { formatDate } from "../../utils/formatDate"
import { SERVER_URL } from "../../data/config"
import PropTypes from "prop-types"

export const StudentsTable = memo(function StudentsTable({studentFilter, studentSearch}) {

    const { allStudents, getStudents } = useContext(StudentsContext)

    const [ Dialog, confirmDelete ] = useConfirm(
        "Are you sure?",
        "The student will be deleted permanently!"
    )

    const filteredAllStudents = allStudents?.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(studentSearch.toLowerCase())
        )
    )

    const deleteStudentHandler = async(id) => {
        const ans = await confirmDelete()
        if (ans) {
            try {
                const response = await fetch(`${SERVER_URL}/api/classes/students/${id}/deleteStudent`,
                    {
                        method: "DELETE",
                    }
                )
                if (response.ok) {
                    getStudents()
                }
            } catch(error) {
                console.log(error)
            }
        }
    }

    return (
        <>
        <div className="table-container" >
            <table className="table">
                <thead className="table__thead">
                    <tr>
                        <th className="thead__th">First Name</th>
                        <th className="thead__th">Last Name</th>
                        <th className="thead__th">Class</th>
                        <th className="thead__th">Gender</th>
                        <th className="thead__th">Code</th>
                        <th className="thead__th">Date of birth</th>
                        <th className="thead__th">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    filteredAllStudents?.map((student) => {
                        return (
                            (studentFilter == "All classes" || studentFilter == student.class) &&
                            <tr className="tbody__tr" key={student._id} >
                                <td className="tbody__td">{student.firstName}</td>
                                <td className="tbody__td">{student.lastName}</td>
                                <td className="tbody__td">{student.class}</td>
                                <td className="tbody__td">{student.gender}</td>
                                <td className="tbody__td">{student.code}</td>
                                <td className="tbody__td">{formatDate(`${student.dateBirth}`)}</td>  
                                <td className="tbody__td">
                                    <div className="table__actions">
                                        <LinkRouter className="small__btn small__btn--yellow" to={`/students/view/${student._id}`} >View</LinkRouter>
                                        <LinkRouter className="small__btn small__btn--green" to={`/students/edit/${student._id}/${student.code}`} >Edit</LinkRouter>
                                        <button className="small__btn small__btn--red" onClick={() => deleteStudentHandler(student._id)} >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
        <Dialog />
        </>
    )
})

StudentsTable.propTypes = {
    studentFilter: PropTypes.any,
    studentSearch: PropTypes.any
}

export default StudentsTable