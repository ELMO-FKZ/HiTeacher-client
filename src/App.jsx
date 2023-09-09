import { useEffect, useContext } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/dashboard/Dashboard"
import Profile from "./pages/profile/Profile"
import NewProfile from "./pages/newProfile/NewProfile"
import Classes from "./pages/classes/Classes"
import NewClass from "./pages/newClass/NewClass"
import EditClass from "./pages/editClass/EditClass"
import Students from "./pages/students/Students"
import NewStudent from "./pages/newStudent/NewStudent"
import EditStudent from "./pages/editStudent/EditStudent"
import ViewStudent from "./pages/viewStudent/ViewStudent"
import Attendance from "./pages/attendance/Attendance"
import NewAttendance from "./pages/newAttendance/NewAttendance"
import DeleteAttendance from "./pages/deleteAttendance/DeleteAttendance"
import Behaviour from "./pages/behaviour/Behaviour"
import NewBehaviour from "./pages/newBehaviour/NewBehaviour"
import ViewBehaviour from "./pages/viewBehaviour/ViewBehaviour"
import EditBehaviour from "./pages/editBehaviour/EditBehaviour"
import Login from "./pages/login/Login"
import NotFound from "./pages/notFound/NotFound"
import { useAuthContext } from "./hooks/useAuthContext"
import PropTypes from "prop-types"

function App() {
  const { user } = useAuthContext()
  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />
  }
  const NoRequireAuth = ({children}) => {
    return !user ? children : <Navigate to="/" />
  }
  const AdminAuth = ({ children }) => {
    return user?.user.role == "Admin" ? children : <Navigate to="/profile" />
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
          <Route index element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="profile" >
            <Route index element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="new" element={<AdminAuth><NewProfile /></AdminAuth>} />
          </Route>
          <Route path="classes" >
            <Route index element={<RequireAuth><Classes/></RequireAuth>} />
            <Route path="new" element={<RequireAuth><NewClass /></RequireAuth>} /> 
            <Route path="edit/:name" element={<RequireAuth><EditClass /></RequireAuth>} /> 
          </Route>
          <Route path="students" >
            <Route index element={<RequireAuth><Students /></RequireAuth>} />
            <Route path="new" element={<RequireAuth><NewStudent /></RequireAuth>} />
            <Route path="view/:id" element={<RequireAuth><ViewStudent /></RequireAuth>} />
            <Route path="edit/:id/:code" element={<RequireAuth><EditStudent /></RequireAuth>} />
          </Route>
          <Route path="attendance" >
            <Route index element={<RequireAuth><Attendance /></RequireAuth>} />
            <Route path="new" element={<RequireAuth><NewAttendance /></RequireAuth>} />
            <Route path="delete" element={<RequireAuth><DeleteAttendance /></RequireAuth>} />
          </Route >
          <Route path="behaviour">
            <Route index element={<RequireAuth><Behaviour /></RequireAuth>} />
            <Route path="new/:id" element={<RequireAuth><NewBehaviour /></RequireAuth>} />
            <Route path="view/:id" element={<RequireAuth><ViewBehaviour /></RequireAuth>} />
            <Route path="edit/:id" element={<RequireAuth><EditBehaviour /></RequireAuth>} />
          </Route>
        </Route>
        <Route path="login" element={<NoRequireAuth><Login /></NoRequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

App.propTypes = {
  children: PropTypes.any
}