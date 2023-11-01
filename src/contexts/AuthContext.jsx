import { useEffect, useReducer, useMemo, createContext } from "react"
import { authReducer } from "../reducers/authReducer"
import PropTypes from "prop-types"

export const AuthContext = createContext()

const initialState = {
    user: null
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])

    const contextValues = useMemo(() => {
        return { ...state, dispatch }
    }, [ state ])

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}