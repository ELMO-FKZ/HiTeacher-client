import { useState, useEffect } from "react"

const useInform = (title, message) => {
    const [promise, setPromise] = useState(null)

    const inform = () => new Promise((resolve) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleOkay = () => {
        promise?.resolve(false)
        handleClose()
    }

    useEffect( () => {
        if(promise !== null) {
            document.body.classList.add("body--modal-open")
        } else {
            document.body.classList.remove("body--modal-open")
        }
    }, [promise])

    const InformationDialog = () => (
        promise !== null &&
        <div className="backdrop" onClick={handleOkay} >
            <div className="modal">
                <div className="modal__text">
                    <div className="modal__title">{title}</div>
                    <p className="modal__para">{message}</p>
                </div>
                <button className="btn small__btn--green" onClick={handleOkay}>Okay</button>
            </div>
        </div>
    )
    return [InformationDialog, inform]
}

export default useInform