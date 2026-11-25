import React from 'react';
import { Leaf } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-16 px-6 ${className}`}
    >
      <div className="w-20 h-20 rounded-full bg-sage flex items-center justify-center mb-5">
        {icon ?? <Leaf className="w-9 h-9 text-primary-light" />}
      </div>
      <h3 className="font-serif text-xl font-semibold text-text-main mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary text-sm max-w-sm leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
