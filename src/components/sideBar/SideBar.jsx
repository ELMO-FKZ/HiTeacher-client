import { useContext, useCallback } from "react"
import { Link as LinkRouter, NavLink } from "react-router-dom"
import { TopSideBarsContext } from "../../contexts/TopSideBarsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import LogoutIcon from "@mui/icons-material/Logout"
import sideBarLinks from "../../data/sideBarLinks"
import "./sideBar.css"

function SideBar() {

    const {isShrinking, isSideBarShown, setIsSideBarShown} = useContext(TopSideBarsContext)
    const {dispatch} = useAuthContext()

    const handleSideBarClick = useCallback(() => {
        setIsSideBarShown(false)
    }, [setIsSideBarShown])

    const handleLogout = () => {
        localStorage.removeItem("user")
        dispatch({ type: "LOGOUT"})
	}

    return (
        <>
        <div className={`overlay ${isSideBarShown ? "overlay--show" : ""}`} onClick={() => handleSideBarClick()} ></div>
        <div className={`sidebar ${isSideBarShown ? "sidebar--show" : ""}`} >
            <div className="sidebar__top">
                <LinkRouter className="sidebar__logo" to="/" onClick={() => handleSideBarClick()} >
                    {isShrinking ? "CR" : "ClassRoom"}
                </LinkRouter>
            </div>
            <div className="sidebar__center">
                <ul className="sidebar__list">
                {
                    sideBarLinks.map((sideBarLink) => {
                        return (
                            <li className="sidebar__list-item" key={sideBarLink.id} onClick={() => handleSideBarClick()}>
                                <NavLink className={({isActive}) => (isActive ? "sidebar__link sidebar__link--active" : "sidebar__link")} to={sideBarLink.path} title={sideBarLink.name}>
                                    {sideBarLink.icon}
                                    {!isShrinking && sideBarLink.name}
                                </NavLink>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
            <div className="sidebar__bottom">
                <LinkRouter className="sidebar__bottom-link" to="/login" onClick={handleLogout}>
                    {!isShrinking && <span className="sidebar__bottom-text">Log out</span>}
                    <LogoutIcon />  
                </LinkRouter>
            </div>
        </div>
        </>
    )
}

export default SideBar