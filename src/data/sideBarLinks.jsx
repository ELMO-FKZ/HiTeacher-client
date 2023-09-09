import DashboardIcon from "@mui/icons-material/Dashboard"
import GroupsIcon from "@mui/icons-material/Groups"
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown"
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"
import CoPresentIcon from "@mui/icons-material/CoPresent"

const sideBarLinks = [
    {id: 1, name:"Dashboard", path:"/", icon: <DashboardIcon />},
    {id: 2, name:"Classes", path:"/classes", icon: <CoPresentIcon />},
    {id: 3, name:"Students", path:"/students", icon: <GroupsIcon />},
    {id: 4, name:"Attendance", path:"/attendance", icon: <EmojiPeopleIcon />},
    {id: 5, name:"Behaviour & Skills", path:"/behaviour", icon: <ThumbsUpDownIcon />}
]

export default sideBarLinks