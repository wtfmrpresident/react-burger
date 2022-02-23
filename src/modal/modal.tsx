import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css"

const modalRoot = document.getElementById('modal');

function Modal(props: {
    isOpen: boolean,
    hide: () => void,
    title?: string,
    children: React.ReactNode
}) {
    const modal = (
        <>
            <div className={modalStyles.overlay} onClick={props.hide} />
            <div className={modalStyles.modal}>
                <div className={`${modalStyles.header} mt-10 ml-10 mr-10`}>
                    <div className={`${modalStyles.title} text text_type_main-large`}>
                        {props.title && props.title}
                    </div>
                    <div className={modalStyles.close}>
                        <CloseIcon type="primary" onClick={props.hide} />
                    </div>
                </div>
                <div className={`${modalStyles.contentContainer}`}>
                    <div className={`${modalStyles.content}`}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )

    return (
        props.isOpen && modalRoot ? createPortal(modal, modalRoot) : null
    )
}

export default Modal