import { useState } from 'react';

export default function useModal(initialState) {
    const [modalState, setModalState] = useState(initialState);
    function toggleModal() {
        setModalState(() => !modalState);
    }
    return [modalState, toggleModal];
}