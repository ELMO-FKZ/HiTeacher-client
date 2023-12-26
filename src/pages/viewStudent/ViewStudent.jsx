import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { formatDate } from "../../utils/formatDate"
import { getStudentApi } from "../../api/api"
import Tab from "../../components/tab/Tab"
import studentsInputs from "../../variables/studentsInputs"

function ViewStudent() {

  const params = useParams()
  const [ student, setStudent ] = useState()

  const studentsLinksView = [
    {name:"All Students", path:"/students"},
    {name:"Add Student", path:"/students/new"},
    {name:"View Student", path:`/students/view/${params.id}`}
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
        <h1>Students</h1>
        <Tab tabLinks={studentsLinksView} />
        <div className="form">
          { student &&
            studentsInputs.map((studentsInput) => {
              return (
                <div className="view-student__item" key={studentsInput.name}>
                  <span className="view-student__item-name" >{studentsInput.label} :</span>
                  <div className="view-student__item-value" >
                    { (studentsInput.label).includes("Date") ? 
                    formatDate(student[`${studentsInput.name}`]) : 
                    (student[`${studentsInput.name}`]) == "" ?
                    "-" :
                    student[`${studentsInput.name}`]
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default ViewStudent