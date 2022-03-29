import modalOverlayStyles from "./modal-overlay.module.css"
import React, {FunctionComponent} from "react";

interface IModalOverlay {
    onBackdropClick: () => void
}

const ModalOverlay: FunctionComponent<IModalOverlay> = ({onBackdropClick}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onBackdropClick} />
    )
}

export default ModalOverlay
