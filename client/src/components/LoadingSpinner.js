import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'default', 
  className = '',
  fullPage = true 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.default;
  
  // Determine container classes based on fullPage prop
  const containerClasses = fullPage 
    ? 'fixed inset-0 flex items-center justify-center bg-white/80' 
    : 'flex items-center justify-center';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="relative">
        {/* Primary spinner */}
        <Loader 
          className={`animate-spin ${spinnerSize} text-blue-500`}
          aria-label="Loading"
        />
        
        {/* Background subtle ring */}
        <div 
          className={`absolute inset-0 rounded-full border-2 border-gray-100 ${spinnerSize}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;