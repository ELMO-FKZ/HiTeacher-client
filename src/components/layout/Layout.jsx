import { Outlet } from "react-router-dom"
import SideBar from "../sideBar/SideBar"
import TopBar from "../topBar/TopBar"

function Layout() {

    return (
        <>
        <SideBar />
        <div className="content">
            <TopBar />
            <Outlet />
        </div>
        </>
    )
}

export default Layout