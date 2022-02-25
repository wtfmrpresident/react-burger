import {useCallback, useEffect, useState} from "react";

function useModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggle = () => setIsOpen(!isOpen)
    const escapeHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
            e.preventDefault()
            toggle()
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            document.addEventListener<'keydown'>('keydown', escapeHandler, false);
        }

        return () => {
            document.removeEventListener<'keydown'>('keydown', escapeHandler);
        }
    }, [escapeHandler, isOpen])

    return {
        isOpen,
        toggle
    }
}

export default useModal