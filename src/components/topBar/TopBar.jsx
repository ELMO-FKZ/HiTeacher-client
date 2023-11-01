import { useState, useContext, useCallback } from "react"
import { Link as LinkRouter, useNavigate } from "react-router-dom"
import { TopSideBarsContext } from "../../contexts/TopSideBarsContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SubjectIcon from "@mui/icons-material/Subject"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SettingsIcon from "@mui/icons-material/Settings"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import useInform from "../../hooks/useInform"
import "./topBar.css"

function TopBar() {

    const [isMenuShown, setIsMenuShown] = useState(false)
    const {setIsShrinking, setIsSideBarShown} = useContext(TopSideBarsContext)
    const {user} = useAuthContext()
    const navigate = useNavigate()

    const [Dialog, inform] = useInform(
        "Sorry!",
        "You are not authorized to access this page!"
    )

    const handleLgBurgerClick = useCallback(() => {
        setIsShrinking(prevSate => !prevSate)
    }, [setIsShrinking])

    const handleSmBurgerClick = useCallback(() => {
        setIsSideBarShown(prevSate => !prevSate)
    }, [setIsSideBarShown])

    const handleUserClick = useCallback(() => {
        setIsMenuShown(prevSate => !prevSate)
    }, [setIsMenuShown])

    const handleProfileClick = () => {
        navigate("/profile")
    }

    const handleSettingsClick = async() => {
        if (user?.user.role !== "Admin") {
            await inform()
        } else {
            navigate("/profile/new")
        }
    }

    return (
        <>
        <header className="topbar">
            <button className="topbar__burger topbar__burger--one" onClick={() => handleLgBurgerClick()} aria-label="Burger for large screens" >
                <SubjectIcon />
            </button>
            <button className="topbar__burger topbar__burger--two" onClick={() => handleSmBurgerClick()} aria-label="Burger for small screens" >
                <SubjectIcon />
            </button>
            <LinkRouter className="topbar__logo" to="/">
                ClassRoom
            </LinkRouter>
            <button className="topbar__notification" aria-label="Notifications button" >
                <NotificationsIcon />
            </button>
            <button className="topbar__user" onClick={() => handleUserClick()}>
                <AccountCircleIcon />
                <span className="topbar__user-name">{user?.user?.firstName}</span>
                {!isMenuShown && <KeyboardArrowDownIcon />}
                {isMenuShown && <KeyboardArrowUpIcon />}
                {isMenuShown && 
                <div className="topbar__user-menu">
                    <div className="topbar__user-menu-item" onClick={() => handleProfileClick()} ><RemoveRedEyeIcon />Profile</div>
                    <div className="topbar__user-menu-item" onClick={() => handleSettingsClick()} ><SettingsIcon />Settings</div>
                </div>
                }
            </button>
        </header>
        <Dialog />
        </>
    )
}

export default TopBar