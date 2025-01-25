import { createContext, useState, useContext, useEffect } from 'react';
import { useKey } from '../hooks';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');

  const toggleInfoModal = () => setInfoModalOpen((prev) => !prev);
  const toggleShareModal = () => setShareModalOpen((prev) => !prev);

  function renderNotification(type) {
    setNotificationType(type);
    setShowNotification(true);
  }

  function hideNotification() {
    setShowNotification('');
    setShowNotification(false);
  }

  useKey('Escape', () => {
    if (infoModalOpen) {
      toggleInfoModal();
    }
    if (shareModalOpen) {
      toggleShareModal();
    }
  });

  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(() => {
        hideNotification();
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showNotification, notificationType]);

  const context = {
    renderNotification,
    hideNotification,
    notificationType,
    showNotification,
    infoModalOpen,
    shareModalOpen,
    toggleShareModal,
    toggleInfoModal,
  };
  return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
