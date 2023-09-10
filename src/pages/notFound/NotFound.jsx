import { useNavigate } from "react-router-dom"
import notFound from "../../assets/disconnected.webp"
import "./notFound.css"

const NotFound = () => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate("/")
  }

  return (
    <div className="notfound">
      <div className="notfound__title">404</div>
      <div>Page Not Found</div>
      <div className="notfound__image" >
        <img className="notfound__img" src={notFound} alt="not found page image" />
      </div>
      <button className="notfound-link" onClick={goBack} >
        Go back home
      </button>
    </div>
  )
}

export default NotFound