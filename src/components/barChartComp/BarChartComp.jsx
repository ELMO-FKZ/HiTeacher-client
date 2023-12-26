import { memo } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import PropTypes from "prop-types"

const BarChartComp = memo(function BarChartComp({ allStudents }) {

    const classCounts = new Map()
    let totalBoys = 0
    let totalGirls = 0

    for (let i = 0; i < allStudents?.length; i++) {
        const student = allStudents[i]
        if (student.gender === "Male") {
            totalBoys += 1
        } else if (student.gender === "Female") {
            totalGirls += 1
        }
        const classCount = classCounts.get(student.class) || { boys: 0, girls: 0 }
        if (student.gender === "Male") {
            classCount.boys += 1
        } else if (student.gender === "Female") {
            classCount.girls += 1
        }
        classCounts.set(student.class, classCount)
    }

    const data = Array.from(classCounts, ([name, { boys, girls }]) => ({
        name,
        boys,
        girls,
        total: boys + girls,
    }))

    data.push({ name: "Total", boys: totalBoys, girls: totalGirls, total: totalBoys + totalGirls })

    return (
        <div className="dashboard__chart-container">
            <div className="dashboard__chart-title bar-title">Students by gender</div>
            <div className="dashboard__bar-chart">
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="2 2" opacity={0}/>
                        <XAxis dataKey="name" stroke="#58585F"/>
                        <YAxis stroke="#58585F"/>
                        <Tooltip />
                        <Bar dataKey="boys" fill="#9b36b5" />
                        <Bar dataKey="girls" fill="#865AE8" />
                        <Bar dataKey="total" fill="#757575" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="dashboard__pie-chart-key key-center">
                <span className="dashboard__pie-chart-sub grape-key-color">boys</span>
                <span className="dashboard__pie-chart-sub violet-key-color">girls</span>
                <span className="dashboard__pie-chart-sub grey-key-color">total</span>
            </div>
        </div>
    )
})

export default BarChartComp

BarChartComp.propTypes = {
    allStudents: PropTypes.array.isRequired
}