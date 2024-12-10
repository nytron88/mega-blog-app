import React from 'react'

function Loader({ className = '' }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-sm">
            <div className={`loader ${className}`}>
                <div className="h-12 w-12 rounded-full border-4 border-t-purple-500 border-r-blue-500 border-b-purple-500 border-l-blue-500 animate-spin" />
            </div>
        </div>
    )
}

// Alternative smaller version
Loader.Spinner = ({ className = '' }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className={`w-6 h-6 rounded-full border-2 border-t-purple-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin ${className}`} />
        </div>
    )
}

// Pulse loader variation
Loader.Pulse = ({ className = '' }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="flex gap-1">
                <div className={`w-3 h-3 rounded-full bg-purple-500 animate-pulse ${className}`} />
                <div className={`w-3 h-3 rounded-full bg-blue-500 animate-pulse delay-150 ${className}`} />
                <div className={`w-3 h-3 rounded-full bg-purple-500 animate-pulse delay-300 ${className}`} />
            </div>
        </div>
    )
}

export default Loader