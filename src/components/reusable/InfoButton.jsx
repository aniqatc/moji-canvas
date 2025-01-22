import { Info } from '@phosphor-icons/react';
import { useUI } from '../../contexts';

export default function InfoButton() {
  const { toggleInfoModal } = useUI();

  return (
    <button
      className="mx-auto transition-colors duration-300 hover:animate-shake hover:text-black active:scale-90"
      aria-label="Open modal for information about this website"
      onClick={toggleInfoModal}
      tabIndex={0}
    >
      <Info size={24} />
    </button>
  );
}
