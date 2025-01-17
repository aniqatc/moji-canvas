export default function BaseButton({
  active = false,
  children,
  disabled = false,
  className = '',
  onClick,
  ariaLabel,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`${active ? 'border-stone-300 bg-active-gray text-black' : disabled ? 'bg-gray-200/70 text-gray-400' : 'border-stone-200 bg-transparent text-gray-500'} group flex items-center justify-center rounded border p-2 transition-all duration-300 active:scale-95 active:shadow-sm h-sm:p-1 ${disabled ? 'cursor-not-allowed hover:bg-gray-200' : 'cursor-pointer hover:bg-active-gray'} ${className}`}
    >
      <span
        className={`flex flex-col items-center text-[11px] transition-all duration-300 ${disabled ? '' : 'group-hover:scale-110 group-hover:text-black'}`}
      >
        {children}
      </span>
    </button>
  );
}
