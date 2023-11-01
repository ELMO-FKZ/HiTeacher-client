import { useState, memo } from "react"
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts"
import PropTypes from "prop-types"

const PieChartComp = memo(function PieChartComp({ classes, allStudents }) {

    const [activeIndex, setActiveIndex] = useState(0)
    const data = []

    for(let i = 0; i < classes?.length; i++) {
        let countClass = 0
        for (let j = 0; j < allStudents?.length; j++) {
            if (classes[i].name == allStudents[j].class) {
                countClass +=1
            }
        }
        data.push({name: `${classes[i].name}`, value: countClass})
    }

    const renderActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload }) => {

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#9b36b5">
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill="#9b36b5" />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill="#9b36b5" />
            </g>
        )
    }

    const onPieEnter = (_, index) => {
        setActiveIndex(index)
    }

    return (
        <div className="dashboard__chart-container">
            <div className="dashboard__chart-title pie-title">Students by class</div>
            <div className="dashboard__pie-chart">
                <ResponsiveContainer>
                    <PieChart >
                        <Pie 
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#757575"
                            dataKey="value"
                            onMouseEnter={onPieEnter} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="dashboard__pie-chart-key">
                <span className="dashboard__pie-chart-sub grape-key-color">Class : </span>
                {data[`${activeIndex}`] == undefined ? 0 : data[`${activeIndex}`].name}
            </div>
            <div className="dashboard__pie-chart-key">
                <span className="dashboard__pie-chart-sub grape-key-color">Students : </span>
                {data[`${activeIndex}`] == undefined ? 0 : data[`${activeIndex}`].value}   
                <span className="dashboard__pie-chart-rate">{data[`${activeIndex}`] == undefined ? 0 : `(Rate : ${(data[activeIndex].value * 100 / allStudents?.length).toFixed(2)}%)`}</span>
            </div>
        </div>
    )
})

export default PieChartComp

PieChartComp.propTypes = {
    classes: PropTypes.array.isRequired,
    allStudents: PropTypes.array.isRequired
}