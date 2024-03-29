import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getStudentApi } from "../../api/api"
import Tab from "../../components/tab/Tab"

function ViewBehaviour() {

    const [ student, setStudent ] = useState()
    const params = useParams()

    const behaviourLinksView = [
        {id: 1, name:"All behaviours", path:"/behaviour"},
        {id: 2, name:"View behaviours", path:`/behaviour/view/${params.id}`}
    ]

    async function getStudent() {
        try {
            const response = await getStudentApi(params.id)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await response.json()
            setStudent(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStudent()
    }, [])

    return (
        <div className="content-wrapper">
            <h1>Behaviours & Skills</h1>
            <Tab tabLinks={behaviourLinksView} />
            <div className="form">
                <div className="view-student__item">
                    <span className="view-student__item-name">Full Name :</span>
                    <div className="view-student__item-value">
                        {student?.firstName} {student?.lastName}
                    </div>
                </div>
                <div className="view-student__item">
                    <span className="view-student__item-name">Behaviours & skills :</span>
                    <div className="view-student__item-value">
                        {student?.behaviour}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBehaviour