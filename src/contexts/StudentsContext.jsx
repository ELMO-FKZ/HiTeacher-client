import { createContext, useState, useMemo } from "react"
import { getStudentsApi } from "../api/api"
import PropTypes from "prop-types"

export const StudentsContext = createContext()

export const StudentsContextProvider = ({ children }) => {

    const [allStudents, setAllStudents] = useState([])

    async function getStudents() {
        try {
            const response = await getStudentsApi()
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await response.json()
            setAllStudents(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    const contextValues = useMemo(() => {
        return { allStudents, getStudents }
    }, [ allStudents ])

    return (
        <StudentsContext.Provider value={contextValues}>
            {children}
        </StudentsContext.Provider>
    )
}

StudentsContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}