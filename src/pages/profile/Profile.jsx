import { useAuthContext } from "../../hooks/useAuthContext"
import userInputs from "../../data/userInputs"
import { formatDate } from "../../utils/formatDate"

const Profile = () => {

  const { user } = useAuthContext()

  return (
    <div className="content-wrapper">
      <h1>Teacher Profile</h1>
      <div className="form">
        { 
          userInputs.map((userInput) => {
            if (userInput.name == "password") {
              return null
            }
            return (
              <div className="view-student__item" key={userInput.name}>
                <span className="view-student__item-name" >{userInput.label} :</span>
                <div className="view-student__item-value" >
                  { (userInput.label).includes("Date") ? 
                  formatDate(user?.user[`${userInput.name}`]) : 
                  (user?.user[`${userInput.name}`]) == "" ?
                  "-" :
                  user?.user[`${userInput.name}`]
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Profile