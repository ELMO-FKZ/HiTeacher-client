import { useState, useEffect } from "react"

const useConfirm = (title, message) => {
    
    const [promise, setPromise] = useState(null)

    const confirm = () => new Promise((resolve) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(true)
        handleClose()
    }

    const handleCancel = () => {
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

    const ConfirmationDialog = () => (
        promise !== null &&
        <div className="backdrop" onClick={(e) => {
            if (e.target === e.currentTarget) {
                handleCancel()
            }
        }} >
            <div className="modal">
                <div className="modal__text">
                    <div className="modal__title">{title}</div>
                    <p className="modal__para">{message}</p>
                </div>
                <button className="btn small__btn--green btn--modal" onClick={handleConfirm}>Yes</button>
                <button className="btn small__btn--red btn--modal" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
    return [ConfirmationDialog, confirm]
}

export default useConfirm