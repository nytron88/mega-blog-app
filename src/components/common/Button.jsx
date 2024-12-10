import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-gradient-to-r from-purple-500 to-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

Button.displayName = "Button"

export default Button