import { memo } from "react"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import PropTypes from "prop-types"

const BarChartComp = memo(function BarChartComp({ classes, allStudents }) {

    const data = []
    let totalBoys = 0
    let totalGirls = 0

    for(let i = 0; i < classes?.length; i++) {
        let countBoys = 0
        let countGirls = 0
        for (let j = 0; j < allStudents?.length; j++) {
            if (classes[i].name == allStudents[j].class && allStudents[j].gender == "Male") {
                countBoys +=1
                totalBoys +=1
            } else if (classes[i].name == allStudents[j].class && allStudents[j].gender == "Female") {
                countGirls +=1
                totalGirls +=1
            }
        }
        data.push({name: `${classes[i].name}`, boys: countBoys, girls: countGirls, total: `${countBoys + countGirls}`})
    }
    data.push({name: "Total", boys: totalBoys, girls: totalGirls, total: `${totalBoys + totalGirls}`})

    return (
        <div className="dashboard__chart-container" > 
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
    classes: PropTypes.array.isRequired,
    allStudents: PropTypes.array.isRequired
}