import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { TopSideBarsContextProvider } from "./contexts/TopSideBarsContext"
import { ClassesContextProvider } from "./contexts/ClassesContext"
import { StudentsContextProvider } from "./contexts/StudentsContext.jsx"
import { AuthContextProvider } from "./contexts/AuthContext.jsx"
import "./normalize.css"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TopSideBarsContextProvider>
        <ClassesContextProvider>
    <App />
        </ClassesContextProvider> 
      </TopSideBarsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
