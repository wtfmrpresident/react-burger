import React, { MouseEventHandler, SyntheticEvent, useEffect } from "react";
import ModalOverlay from "./modal-overlay";
import {createPortal} from "react-dom";
import modalStyles from "../modal/modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface ModalProps {
    isModalVisible?: boolean
    onClose: () => void,
    title?: string,
    children: React.ReactNode
}

const stopPropagation: MouseEventHandler<HTMLDivElement> = e => {
    e.persist();
    e.stopPropagation();
}

const modalRoot = document.getElementById('modal');

const Modal: React.FC<ModalProps> = ({onClose, title, children, isModalVisible}) => {
    useEffect(() => {
        const onEscapeKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }
        document.addEventListener<'keydown'>('keydown', onEscapeKeydown, false);

        return () => {
            document.removeEventListener<'keydown'>('keydown', onEscapeKeydown);
        }
    }, [onClose])

    if (typeof isModalVisible !== "undefined" && !isModalVisible) {
        return null
    }

    const modal = (
        <>
            <ModalOverlay onBackdropClick={onClose} />
            <div onClick={stopPropagation}>
                <div className={modalStyles.modal}>
                    <div className={`${modalStyles.header} mt-10 ml-10 mr-10`}>
                        <div className="text text_type_main-large">
                            {title && title}
                        </div>
                        <div className={modalStyles.close}>
                            <CloseIcon type="primary" onClick={onClose} />
                        </div>
                    </div>
                    <div className="content_container">
                        <div className={`${modalStyles.content}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return modalRoot ? createPortal(modal, modalRoot) : null
}

export default Modal
