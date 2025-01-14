export default function BaseButton({
    active = false,
    children,
    disabled = false,
    className = "",
    onClick,
    ariaLabel
}) {
    return (
        <button type="button"
                onClick={onClick}
                disabled={disabled}
                aria-label={ariaLabel}
                aria-pressed={active}
                className={`${active ? 'bg-active-gray text-black border-stone-300' : disabled ? 'bg-gray-200/70 text-gray-400' : 'bg-transparent text-gray-500 border-stone-200'}
         group transition-all duration-300 flex items-center justify-center p-2 border rounded h-sm:p-1
         ${disabled ? 'cursor-not-allowed hover:bg-gray-200' : 'cursor-pointer hover:bg-active-gray'} ${className}`}>
            <span className={`text-[11px] transition-all duration-300 flex flex-col items-center 
            ${disabled ? '' : 'group-hover:scale-110 group-hover:text-black'}`}>
                {children}
            </span>
        </button>
    )
}