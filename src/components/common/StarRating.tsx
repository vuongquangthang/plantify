import React from 'react';
import { Star } from 'lucide-react';
import { getStarValues } from '../../utils/helpers';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export default function StarRating({
  rating,
  size = 'sm',
  showValue = false,
  className = '',
}: StarRatingProps) {
  const stars = getStarValues(rating);
  const iconSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars.map((starType, idx) => (
        <span key={idx} className="relative inline-block">
          {starType === 'full' && (
            <Star className={`${iconSize} text-amber-400 fill-amber-400`} />
          )}
          {starType === 'half' && (
            <span className="relative">
              <Star className={`${iconSize} text-gray-200 fill-gray-200`} />
              <span className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={`${iconSize} text-amber-400 fill-amber-400`} />
              </span>
            </span>
          )}
          {starType === 'empty' && (
            <Star className={`${iconSize} text-gray-200 fill-gray-200`} />
          )}
        </span>
      ))}
      {showValue && (
        <span className="ml-1 text-xs text-text-secondary font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
