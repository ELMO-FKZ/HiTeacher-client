import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import PropTypes from "prop-types"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" >
            <Route index element={<Profile />} />
            <Route path="new" element={<NewProfile />} />
          </Route>
          <Route path="classes" >
            <Route index element={<Classes/>} />
            <Route path="new" element={<NewClass />} /> 
            <Route path="edit/:name" element={<EditClass />} /> 
          </Route>
          <Route path="students" >
            <Route index element={<Students />} />
            <Route path="new" element={<NewStudent />} />
            <Route path="view/:id" element={<ViewStudent />} />
            <Route path="edit/:id/:code" element={<EditStudent />} />
          </Route>
          <Route path="attendance" >
            <Route index element={<Attendance />} />
            <Route path="new" element={<NewAttendance />} />
            <Route path="delete" element={<DeleteAttendance />} />
          </Route >
          <Route path="behaviour">
            <Route index element={<Behaviour />} />
            <Route path="new/:id" element={<NewBehaviour />} />
            <Route path="view/:id" element={<ViewBehaviour />} />
            <Route path="edit/:id" element={<EditBehaviour />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
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