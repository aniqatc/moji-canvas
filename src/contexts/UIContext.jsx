import { createContext, useState, useContext, useEffect } from 'react';
import { useKey } from '../hooks';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);

  const toggleInfoModal = () => setInfoModalOpen((prev) => !prev);
  const toggleShareModal = () => setShareModalOpen((prev) => !prev);
  const togglePicker = () => setPickerOpen((prev) => !prev);

  function renderNotification(type) {
    setNotificationType(type);
    setShowNotification(true);
    // Restarts the hide timer even when the same notification fires twice in a row.
    setNotificationCount((prev) => prev + 1);
  }

  function hideNotification() {
    setNotificationType('');
    setShowNotification(false);
  }

  useKey('Escape', () => {
    if (infoModalOpen) setInfoModalOpen(false);
    if (shareModalOpen) setShareModalOpen(false);
    if (pickerOpen) setPickerOpen(false);
  });

  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(hideNotification, 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [showNotification, notificationType, notificationCount]);

  const context = {
    renderNotification,
    hideNotification,
    notificationType,
    notificationCount,
    showNotification,
    infoModalOpen,
    shareModalOpen,
    pickerOpen,
    toggleShareModal,
    toggleInfoModal,
    togglePicker,
  };
  return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export const useUI = () => useContext(UIContext);
