import SideBar from "../sideBar/SideBar"
import TopBar from "../topBar/TopBar"
import { Outlet } from "react-router-dom"

const Layout = () => {

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