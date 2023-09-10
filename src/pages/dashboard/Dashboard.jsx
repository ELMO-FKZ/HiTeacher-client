import { useContext, useMemo } from "react"
import { ClassesContext } from "../../contexts/ClassesContext"
import { StudentsContext } from "../../contexts/StudentsContext"
import Widget from "../../components/widget/Widget"
import PieChartComp from "../../components/pieChartComp/PieChartComp"
import BarChartComp from "../../components/barChartComp/BarChartComp"
import { formatDate } from "../../utils/formatDate"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1"
import GroupsIcon from "@mui/icons-material/Groups"
import "./dashboard.css"

const Dashboard = () => {

  const today = new Date()
  const date = today.setDate(today.getDate())
  const defaultValue = new Date(date).toISOString().split("T")[0]
  const { classes } = useContext(ClassesContext)
  const { allStudents } = useContext(StudentsContext)
  let todayAbs = 0
  let todayPr = 0

  useMemo(() => {
    for(let i = 0; i < allStudents?.length; i++) {
      for (let j = 0; j < allStudents[i].attendance.length; j++) {
        if (formatDate(allStudents[i].attendance[j].date) == defaultValue && allStudents[i].attendance[j].aHours !== 0) {
          todayAbs += 1
        } else if (formatDate(allStudents[i].attendance[j].date) == defaultValue && allStudents[i].attendance[j].aHours == 0) {
          todayPr += 1
        }
      }
    }
  },[allStudents])

  return (
    <div className="content-wrapper md-120">
      <h1>Dashboard</h1>
      <div className="dashboard__cards">
        <Widget icon={<ViewModuleIcon />} indicator={classes?.length} title="Total Classes" />
        <Widget icon={<GroupsIcon />} indicator={allStudents?.length} title="Total Students" />
        <Widget icon={<PersonAddAlt1Icon />} indicator={todayPr} title="Present Today" />
        <Widget icon={<PersonRemoveAlt1Icon />} indicator={todayAbs} title="Absent Today" />
      </div>
      <div className="dashboard__charts">
        <PieChartComp classes={classes} allStudents={allStudents} />
        <BarChartComp classes={classes} allStudents={allStudents} />
      </div>
    </div>
  )
}

export default Dashboard