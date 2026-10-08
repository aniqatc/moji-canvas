import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useUI, useCanvas } from './contexts';
import {
  CanvasBackground,
  Toolbar,
  ClickHintText,
  Heading,
  InfoModal,
  Notification,
  ShareModal,
  StickerInspector,
  StickerList,
  StickerPickerModal,
} from './components';

export default function App() {
  const constraintsRef = useRef(null);
  const { notificationType, notificationCount, showNotification } = useUI();
  const { canvasId, stickers, showInitialElements } = useCanvas();

  return (
    <CanvasBackground ref={constraintsRef}>
      <AnimatePresence>
        {showInitialElements && (
          <>
            <ClickHintText />
            <Heading />
          </>
        )}
      </AnimatePresence>
      <StickerList constraintsRef={constraintsRef} />
      <Toolbar disableButton={showInitialElements || stickers.length === 0} ref={constraintsRef} />
      <StickerInspector />

      {/* -- Notifications & Modals -- */}
      <InfoModal />
      <ShareModal canvasId={canvasId} />
      <StickerPickerModal />
      <AnimatePresence>
        {showNotification && <Notification key={`${notificationType}-${notificationCount}`} type={notificationType} />}
      </AnimatePresence>
    </CanvasBackground>
  );
}
