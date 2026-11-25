import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
};

export default function LoadingSpinner({
  size = 'md',
  className = '',
  fullScreen = false,
  text,
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-full border-primary/20 border-t-primary animate-spin`}
      />
      {text && <p className="text-sm text-text-secondary">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-cream/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
