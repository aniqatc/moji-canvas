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
                className={`${active ? 'bg-active-gray text-black border-stone-300' : 'bg-transparent text-gray-500 border-stone-200'} 
        hover:bg-active-gray group transition-all duration-300 flex items-center justify-center 
        p-3 border rounded ${className}`}>
            <span className="group-hover:scale-110 group-hover:text-black transition-all duration-300">{children}</span>
        </button>
    )
}