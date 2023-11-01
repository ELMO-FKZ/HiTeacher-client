import { memo } from "react"
import { NavLink, useLocation } from "react-router-dom"
import PropTypes from "prop-types"
import "./tab.css"

const Tab = memo(function Tab({ tabLinks }) {

    const location = useLocation()
    
    return (
        <div className="tab">
            <ul className="tab__list">
            {
                tabLinks.map((tabLink) => {
                    return (
                        <li className="tab__list-item" key={tabLink.name} >
                            <NavLink className={location.pathname === tabLink.path ? "tab__link tab__link--active" : "tab__link"} to={tabLink.path} >
                                {tabLink.name}
                            </NavLink>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
})

Tab.propTypes = {
    tabLinks: PropTypes.array.isRequired
}

export default Tab



