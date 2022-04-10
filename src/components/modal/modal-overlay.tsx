import modalOverlayStyles from "./modal-overlay.module.css"
import React, { FC } from "react";

interface IModalOverlay {
    onBackdropClick: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({onBackdropClick}) => {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onBackdropClick} />
    )
}

export default ModalOverlay
