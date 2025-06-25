import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import FilterTabs from '@/components/molecules/FilterTabs';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskHeader = ({ 
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  onBulkActions,
  taskCounts,
  className = ''
}) => {
  const filters = [
    { 
      id: 'all', 
      label: 'All', 
      icon: 'List',
      count: taskCounts?.all || 0
    },
    { 
      id: 'active', 
      label: 'Active', 
      icon: 'Circle',
      count: taskCounts?.active || 0
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      icon: 'CheckCircle',
      count: taskCounts?.completed || 0
    },
    { 
      id: 'high', 
      label: 'High Priority', 
      icon: 'AlertCircle',
      count: taskCounts?.high || 0
    }
  ];
  
  const sortOptions = [
    { id: 'order', label: 'Custom Order', icon: 'ArrowUpDown' },
    { id: 'priority', label: 'Priority', icon: 'AlertTriangle' },
    { id: 'dueDate', label: 'Due Date', icon: 'Calendar' },
    { id: 'title', label: 'Title', icon: 'Type' }
  ];
  
  return (
    <motion.div
      className={`bg-white border-b border-gray-100 p-6 space-y-4 ${className}`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Row - Search and Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <SearchBar
            placeholder="Search tasks..."
            onSearch={onSearchChange}
            onClear={() => onSearchChange('')}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
            </div>
          </div>
          
          {/* Bulk Actions */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBulkActions?.('markAllComplete')}
            icon="CheckCheck"
            title="Mark all as complete"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onBulkActions?.('clearCompleted')}
            icon="Trash2"
            title="Clear completed tasks"
          />
        </div>
      </div>
      
      {/* Filter Tabs */}
      <FilterTabs
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />
    </motion.div>
  );
};

export default TaskHeader;