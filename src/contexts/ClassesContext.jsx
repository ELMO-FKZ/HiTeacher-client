import { createContext, useState, useMemo } from "react"
import PropTypes from "prop-types"

export const ClassesContext = createContext()

export const ClassesContextProvider = ({ children }) => {

    const [classes, setClasses] = useState([])

    async function getClasses() {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/classes/getClasses`)
            if (!res.ok) {
                throw new Error("Failed to fetch data")
            }
            const jsonData = await res.json()
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
    children: PropTypes.any.isRequired
}