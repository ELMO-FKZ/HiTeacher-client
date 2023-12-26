import { useState, memo } from "react"
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts"
import PropTypes from "prop-types"

const PieChartComp = memo(function PieChartComp({ allStudents }) {

    const [activeIndex, setActiveIndex] = useState(0)
    const classCounts = new Map()

    for (let i = 0; i < allStudents?.length; i++) {
        const student = allStudents[i]
        const classCount = classCounts.get(student.class) || 0
        classCounts.set(student.class, classCount + 1)
    }

    const data = Array.from(classCounts, ([name, value]) => ({ name, value }))

    const renderActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload }) => {
        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#9b36b5">
                    {payload.name}
                </text>
                <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill="#9b36b5" />
                <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill="#9b36b5" />
            </g>
        )
    }

    const onPieEnter = (_, index) => {
        setActiveIndex(index)
    }

    const activeData = data[activeIndex] || { name: 0, value: 0 }
    const activeName = activeData.name
    const activeValue = activeData.value
    const activeRate = ((activeValue * 100) / allStudents?.length).toFixed(2)

    return (
        <div className="dashboard__chart-container">
            <div className="dashboard__chart-title pie-title">Students by class</div>
            <div className="dashboard__pie-chart">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie activeIndex={activeIndex} activeShape={renderActiveShape} data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#757575" dataKey="value" onMouseEnter={onPieEnter} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="dashboard__pie-chart-key">
                <span className="dashboard__pie-chart-sub grape-key-color">Class : </span>
                {activeName}
            </div>
            <div className="dashboard__pie-chart-key">
                <span className="dashboard__pie-chart-sub grape-key-color">Students : </span>
                {activeValue}
                <span className="dashboard__pie-chart-rate">{`(Rate : ${activeRate}%)`}</span>
            </div>
        </div>
    )
})

export default PieChartComp

PieChartComp.propTypes = {
    allStudents: PropTypes.array.isRequired
}