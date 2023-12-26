import { createContext, useState, useMemo } from "react"
import { getClassesApi } from "../api/api"
import PropTypes from "prop-types"

export const ClassesContext = createContext()

export const ClassesContextProvider = ({ children }) => {

    const [classes, setClasses] = useState([])

    async function getClasses() {
        try {
            const response = await getClassesApi()
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await response.json()
            setClasses(jsonData)
        } catch (error) {
            console.log(error)
        }
    }

    const contextValues = useMemo(() => {
        return { classes, getClasses }
    }, [ classes ])

    return (
        <ClassesContext.Provider value={contextValues}>
            {children}
        </ClassesContext.Provider>
    )
}

ClassesContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
