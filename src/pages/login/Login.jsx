import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import LoginIcon from "@mui/icons-material/Login"
import CloseIcon from "@mui/icons-material/Close"
import "./login.css"

function Login() {

  const [ isClose, setIsClose ] = useState(false)
  const [ login, setLogin ] = useState({})
  const { dispatch } = useAuthContext()
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear().toString()

  const handleCloseTestClick = () => {
    setIsClose(prevState => !prevState)
  } 

  const changeLoginHandler = (e) => {
    let name = e.target.name
    let val = e.target.value
    setLogin({...login, [name]: val})
    setError(null)
  }

  const submitLoginHandler = async(e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login)
      })
      const jsonData = await res.json()
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(jsonData))
        dispatch({ type: "LOGIN", payload: jsonData})
        navigate("/")
      } 
      if(!res.ok) {
        setError(jsonData.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className="login">
      <div className="login__logo">
        ClassRoom
      </div>
      { !isClose && 
      <div className="login__test">
        <div className="login__test-info"> Demo account : </div>
        <span className="login__test-close" onClick={() => handleCloseTestClick()}>
          <CloseIcon />
        </span>
          <div><span className="login__test-detail">email : </span>visitor@classroom.com</div>
          <div><span className="login__test-detail">password : </span>123456</div>
      </div>
      }
        <form className="login__form" id="login__form" method="" onSubmit={(e) => submitLoginHandler(e)}>
          <div className="form__section">
            <label className="label" htmlFor="email">Email :</label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              placeholder="Enter the email address"
              onChange={(e) => changeLoginHandler(e)}
              required
              autoComplete="false"
            />
          </div>
          <div className="form__section">
            <label className="label" htmlFor="password">Password :</label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              placeholder="Enter the password"
              onChange={(e) => changeLoginHandler(e)}
              required
              autoComplete="false"
            />
          </div>
          <button className="login__btn btn" type="submit">Login <LoginIcon/></button>
        </form>
        {
          error && <div className="login__error">{error}</div>
        }
    </div>
    <div className="login__copyright">
      <p> &copy; Copyright {currentYear} </p>
      Designed & built by <a className="login__copyright-owner" href="https://elmo.onrender.com" target="_blank" rel="noopener noreferrer">EL MOKHTAR FKHARZ</a>
    </div>
    </>
  )
}

export default Login