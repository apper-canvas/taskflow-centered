import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  size = 'md',
  disabled = false,
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };
  
  return (
    <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <motion.div
          className={`${sizes[size]} border-2 rounded-md transition-all duration-150 ${
            checked 
              ? 'bg-primary border-primary' 
              : 'bg-white border-gray-300 hover:border-gray-400'
          }`}
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <ApperIcon 
                  name="Check" 
                  size={iconSizes[size]} 
                  className="text-white"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {label && (
        <span className="ml-2 text-sm text-gray-700 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;