import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label,
  type = 'text',
  placeholder,
  icon,
  iconPosition = 'left',
  error,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 border-2 rounded-lg transition-all duration-150 focus-ring';
  const stateClasses = error 
    ? 'border-error focus:border-error' 
    : 'border-gray-200 focus:border-primary hover:border-gray-300';
  
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`${baseClasses} ${stateClasses} ${
            icon && iconPosition === 'left' ? 'pl-10' : ''
          } ${
            icon && iconPosition === 'right' ? 'pr-10' : ''
          }`}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;