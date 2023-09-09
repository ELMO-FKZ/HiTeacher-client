import { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"

export const StudentsContext = createContext()

export const StudentsContextProvider = ({ children }) => {

    const [allStudents, setAllStudents] = useState([])

    async function getStudents() {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/students/getStudents`)
            if (!res.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await res.json()
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
    children: PropTypes.any.isRequired
}