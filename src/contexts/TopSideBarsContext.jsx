import { createContext, useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"

export const TopSideBarsContext = createContext()

export const TopSideBarsContextProvider = ({ children }) => {

    const [isShrinking, setIsShrinking] = useState(false)
    const [isSideBarShown, setIsSideBarShown] = useState(false)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) {
                setIsShrinking(false)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const contextValues = useMemo(() => {
        return { isShrinking, setIsShrinking , isSideBarShown, setIsSideBarShown }
    }, [ isShrinking, setIsShrinking, isSideBarShown, setIsSideBarShown ])

    return (
        <TopSideBarsContext.Provider value={contextValues}>
            {children}
        </TopSideBarsContext.Provider>
    )
}

TopSideBarsContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}