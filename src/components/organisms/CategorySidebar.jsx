import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryItem from '@/components/molecules/CategoryItem';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ProgressRing from '@/components/atoms/ProgressRing';
import ApperIcon from '@/components/ApperIcon';

const CategorySidebar = ({ 
  categories = [],
  tasks = [],
  activeCategory,
  onCategorySelect,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  className = ''
}) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('blue');
  
  const colors = [
    'red', 'orange', 'yellow', 'green', 
    'blue', 'indigo', 'purple', 'pink'
  ];
  
const getTaskCountForCategory = (categoryId) => {
    return tasks.filter(task => task.category_id_c === categoryId).length;
  };
  
const getCompletedTasksCount = () => {
    return tasks.filter(task => task.completed_c).length;
  };
  
  const getProgressPercentage = () => {
    if (tasks.length === 0) return 0;
    return (getCompletedTasksCount() / tasks.length) * 100;
  };
  
  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    
const categoryData = {
      name: newCategoryName.trim(),
      color: newCategoryColor
    };
    
    onCreateCategory?.(categoryData);
    setNewCategoryName('');
    setNewCategoryColor('blue');
    setIsAddingCategory(false);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreateCategory();
    } else if (e.key === 'Escape') {
      setIsAddingCategory(false);
      setNewCategoryName('');
    }
  };
  
  return (
    <motion.div
      className={`bg-white border-r border-gray-200 h-full flex flex-col ${className}`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with Progress */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-gray-900">TaskFlow</h2>
          <ProgressRing 
            progress={getProgressPercentage()}
            size={40}
            strokeWidth={3}
            showPercentage={false}
            className="text-primary"
          />
        </div>
        
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Completed</span>
            <span>{getCompletedTasksCount()} / {tasks.length}</span>
          </div>
        </div>
      </div>
      
      {/* All Tasks */}
      <div className="p-4">
        <motion.div
          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 ${
            !activeCategory 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'hover:bg-gray-50 text-gray-700'
          }`}
          onClick={() => onCategorySelect?.(null)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="List" className="w-5 h-5" />
          <div className="flex-1 flex items-center justify-between">
            <span className="font-medium">All Tasks</span>
            <span className="text-xs opacity-75">{tasks.length}</span>
          </div>
        </motion.div>
      </div>
      
      {/* Categories */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Categories
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAddingCategory(true)}
            icon="Plus"
            className="w-6 h-6"
          />
        </div>
        
        <div className="space-y-1">
          <AnimatePresence>
            {categories.map((category) => (
              <motion.div
                key={category.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CategoryItem
                  category={category}
                  taskCount={getTaskCountForCategory(category.Id)}
                  isActive={activeCategory === category.Id}
                  onClick={() => onCategorySelect?.(category.Id)}
                  onEdit={onUpdateCategory}
                  onDelete={onDeleteCategory}
                />
              </motion.div>
            ))}
            
            {isAddingCategory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-lg p-3 space-y-3"
              >
                <Input
                  type="text"
                  placeholder="Category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                />
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Color:</span>
                  <div className="flex gap-1">
                    {colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewCategoryColor(color)}
                        className={`w-6 h-6 rounded-full category-${color} transition-all ${
                          newCategoryColor === color ? 'ring-2 ring-gray-400 ring-offset-1' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleCreateCategory}
                    disabled={!newCategoryName.trim()}
                  >
                    Add
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setIsAddingCategory(false);
                      setNewCategoryName('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-100 text-xs text-gray-500">
        <div className="space-y-1">
          <div className="flex justify-between">
<span>High Priority</span>
            <span>{tasks.filter(t => t.priority_c === 'high' && !t.completed_c).length}</span>
          </div>
          <div className="flex justify-between">
            <span>Due Today</span>
<span>
              {tasks.filter(t => {
                if (!t.due_date_c || t.completed_c) return false;
                const today = new Date().toISOString().split('T')[0];
                return t.due_date_c === today;
              }).length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CategorySidebar;