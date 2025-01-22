import { createContext, useState, useContext } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    const toggleInfoModal = () => setInfoModalOpen(prev => !prev);
    const toggleShareModal = () => setShareModalOpen(prev => !prev);

    function renderNotification(type) {
        setNotificationType(type);
        setShowNotification(true);
    }

    function hideNotification() {
        setShowNotification('');
        setShowNotification(false);
    }

    const context = {
        renderNotification,
        hideNotification,
        notificationType,
        showNotification,
        infoModalOpen,
        shareModalOpen,
        toggleShareModal,
        toggleInfoModal,
    }

    return (<UIContext.Provider value={context}>{children}</UIContext.Provider>)
}

export const useUI = () => useContext(UIContext);