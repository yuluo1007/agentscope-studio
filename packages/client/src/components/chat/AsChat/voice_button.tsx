import React from 'react';

interface VoiceButtonProps {
    isListening: boolean;
    onClick: () => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({
    isListening,
    onClick,
    disabled = false,
    size = 'sm',
    className = '',
}) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        relative ${sizeClasses[size]} rounded-full
        flex items-center justify-center
        transition-all duration-300 ease-in-out
        ${
            isListening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/50'
                : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
        ${className}
      `}
            aria-label={isListening ? 'Stop recording' : 'Start recording'}
        >
            {/* Ripple effect */}
            {isListening && (
                <>
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-pulse opacity-50"></span>
                </>
            )}

            {/* Microphone icon */}
            <svg
                className={`${iconSizes[size]} text-white relative z-10`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                {isListening ? (
                    // Stop icon
                    <rect
                        x="6"
                        y="6"
                        width="12"
                        height="12"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                ) : (
                    // Microphone icon
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                )}
            </svg>
        </button>
    );
};

export default VoiceButton;
