import { useState } from "react"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import useInform from "../../hooks/useInform"
import userInputs from "../../data/userInputs"
import genders from "../../data/genders"
import roles from "../../data/roles"

const NewProfile = () => {

    const [newProfile, setNewProfile] = useState({gender: "Choose a gender", role: "Choose a role"})

    const [DialogOne, informOne] = useInform(
        "Try again!",
        "You have to fill all the required fields!"
    )

    const [DialogTwo, informTwo] = useInform(
        "Done!",
        "A new user has been added successfully!"
    )

    const [DialogThree, informThree] = useInform(
        "Try again!",
        "This email already exists!"
    )

    const changeNewProfiletHandler = (e) => {
        let name = e.target.name
        let val = e.target.value
        setNewProfile({...newProfile, [name]: val})
    }

    const addNewProfiletHandler = async(e) => {
        e.preventDefault()
        if(newProfile.gender !== "Choose a gender" && newProfile.role !== "Choose a role") {
            try {
                const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify(newProfile)
                })
                if(res.ok) {
                    const ans = await informTwo()
                    if(!ans) {
                        e.target.reset()
                        setNewProfile({gender: "Choose a gender", role: "Choose a role"})
                    }
                }
                if(!res.ok) {
                    await informThree()
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            await informOne()
        }
    }

    return (
        <>
        <div className="content-wrapper">
            <h1>Settings</h1>
            <form className="form" id="add-teacher__form" method="" onSubmit={(e) => addNewProfiletHandler(e)}>
            {
                userInputs.map((userInput) => {
                if (userInput.name === "gender"){
                    return (
                    <div className="form__section" key={userInput.name}>
                        <label className="label" htmlFor={userInput.id}>{userInput.label} <span className="required">*</span></label>
                        <select className="input" id={userInput.id} name={userInput.name} onChange={(e) => changeNewProfiletHandler(e)} required >
                        <option>Choose a gender</option>
                        {
                            genders.map((gender) => {
                                return (
                                    <option key={gender.id}>{gender.type}</option>
                                )
                            })
                        }
                        
                        </select>
                    </div>
                    )
                } else if (userInput.name === "role") {
                    return (
                    <div className="form__section" key={userInput.name}>
                        <label className="label" htmlFor={userInput.id}>{userInput.label} <span className="required">*</span></label>
                        <select className="input" id={userInput.id} name={userInput.name} onChange={(e) => changeNewProfiletHandler(e)} required >
                            <option>Choose a role</option>
                            {
                                roles.map((doc) => {
                                    return (
                                    <option key={doc.id}>{doc.type}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    )
                } else {
                    return (
                    <div className="form__section" key={userInput.name}>
                        <label className="label" htmlFor={userInput.id}>{userInput.label} {userInput.required && <span className="required">*</span>}</label>
                        <input className="input"
                            id={userInput.id}
                            type={userInput.type} 
                            placeholder={userInput.placeholder} 
                            name={userInput.name} 
                            onChange={(e) => changeNewProfiletHandler(e)}
                            required={userInput.required}
                            autoComplete="false" />
                    </div>
                    )
                }
                })
            }
            <button className="btn small__btn--green" type="submit" id="submit" value="submit-add-teacher" name="Submit-add-teacher" > Add <PlaylistAddIcon/></button>
            </form>
        </div>
        <DialogOne />
        <DialogTwo />
        <DialogThree />
        </>
    )
}

export default NewProfile