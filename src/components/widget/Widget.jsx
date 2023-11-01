import { memo } from "react"
import PropTypes from "prop-types"

const Widget = memo(function Widget({icon, indicator, title}) {

return (
    <div className="dashboard__card">
        {icon}
        <div className="dashboard__card-info">
            <div className="dashboard__card-number">{indicator}</div>
            <div className="dashboard__card-title">{title}</div>
        </div>
    </div>
)
})

export default Widget

Widget.propTypes = {
    icon: PropTypes.element.isRequired,
    indicator: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
}