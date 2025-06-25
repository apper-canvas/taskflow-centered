import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';

const FilterTabs = ({ 
  filters,
  activeFilter,
  onFilterChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 p-1 bg-gray-100 rounded-lg ${className}`}>
      {filters.map((filter) => (
        <motion.div key={filter.id} className="relative">
          <Button
            variant={activeFilter === filter.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            icon={filter.icon}
            className={`relative z-10 ${
              activeFilter === filter.id 
                ? 'text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter.label}
            {filter.count !== undefined && (
              <span className="ml-1 text-xs opacity-75">
                ({filter.count})
              </span>
            )}
          </Button>
          
          {activeFilter === filter.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded-md -z-10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FilterTabs;