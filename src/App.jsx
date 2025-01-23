import { useRef } from 'react';
import { AnimatePresence, useDragControls } from 'framer-motion';
import { useUI, useCanvas } from './contexts';
import {
  CanvasBackground,
  ClickHintText,
  Heading,
  InfoModal,
  Notification,
  ShareModal,
  Toolbar,
  StickerList,
} from './components';

export default function App() {
  const controls = useDragControls();
  const constraintsRef = useRef(null);
  const { notificationType, showNotification } = useUI();
  const { canvasId, designers, animationProps, showInitialElements } = useCanvas();
  const { animateMode } = animationProps;

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
      <StickerList controls={controls} constraintsRef={constraintsRef} />
      <Toolbar disableButton={showInitialElements || animateMode} ref={constraintsRef} />
      <InfoModal stickerDesigners={designers} />
      <ShareModal canvasId={canvasId} />
      {showNotification && (
        <AnimatePresence>
          <Notification key={notificationType} type={notificationType} />
        </AnimatePresence>
      )}
    </CanvasBackground>
  );
}
