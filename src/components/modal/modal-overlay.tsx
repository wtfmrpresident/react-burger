import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css"

function Modal(props: {
    hide: () => void,
}) {
    return (
        <div className={modalOverlayStyles.overlay} onClick={props.hide} />
    )
}

export default Modal
