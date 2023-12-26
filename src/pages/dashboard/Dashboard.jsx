import { useContext, useRef, useMemo } from "react"
import { Link as LinkRouter } from "react-router-dom"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import { formatDate } from "../../utils/formatDate"
import Widget from "../../components/widget/Widget"
import PieChartComp from "../../components/pieChartComp/PieChartComp"
import BarChartComp from "../../components/barChartComp/BarChartComp"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1"
import GroupsIcon from "@mui/icons-material/Groups"
import "./dashboard.css"

function Dashboard() {

  const today = new Date()
  const date = today.setDate(today.getDate())
  const defaultValue = new Date(date).toISOString().split("T")[0]
  const { classes } = useContext(ClassesContext)
  const { allStudents } = useContext(StudentsContext)
  const todayAbsRef = useRef(0)
  const todayPrRef = useRef(0)

  useMemo(() => {
    todayAbsRef.current = 0
    for(let i = 0; i < allStudents?.length; i++) {
      for (let j = 0; j < allStudents[i].attendance.length; j++) {
        if (formatDate(allStudents[i].attendance[j].date) == defaultValue && allStudents[i].attendance[j].aHours !== 0) {
          todayAbsRef.current += 1
        } else if (formatDate(allStudents[i].attendance[j].date) == defaultValue && allStudents[i].attendance[j].aHours == 0) {
          todayPrRef.current += 1
        }
      }
    }
  },[allStudents, defaultValue])

  return (
    <div className="content-wrapper md-120">
      <h1>Dashboard</h1>
      <div className="dashboard__cards">
        <Widget icon={<ViewModuleIcon />} indicator={classes?.length} title="Total Classes" />
        <Widget icon={<GroupsIcon />} indicator={allStudents?.length} title="Total Students" />
        <Widget icon={<PersonAddAlt1Icon />} indicator={todayPrRef.current} title="Present Today" />
        <Widget icon={<PersonRemoveAlt1Icon />} indicator={todayAbsRef.current} title="Absent Today" />
      </div>
      {
        (classes?.length === 0)
        ?
        <div className="class-empty">
          <div className="class-empty__title">Start managing your classes!</div>
          <div>Click <LinkRouter className="class-empty__span" to="/classes/new" >Add Class</LinkRouter> to create your first class.</div>
        </div>
        :
        (allStudents?.length === 0)
        ?
        <div className="class-empty">
          <div className="class-empty__title">Start managing your Students!</div>
          <div>Click <LinkRouter className="class-empty__span" to="/students/new" >Add Student</LinkRouter> to insert the information of your first student.</div>
        </div>
        :
        <div className="dashboard__charts">
          <PieChartComp allStudents={allStudents} />
          <BarChartComp allStudents={allStudents} />
        </div>
      }
    </div>
  )
}

export default Dashboard