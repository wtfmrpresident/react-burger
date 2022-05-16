import modalOverlayStyles from "./modal-overlay.module.css"
import React, { FC, SyntheticEvent, useEffect, useRef } from "react";

interface IModalOverlay {
    onBackdropClick: () => void
}

const ModalOverlay: FC<IModalOverlay> = ({onBackdropClick}) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleClick = (e: SyntheticEvent) => {
        if (e.target === ref.current) {
            onBackdropClick()
        }
    }

    return (
        <div className={modalOverlayStyles.overlay} onClick={handleClick} ref={ref} />
    )
}

export default ModalOverlay
