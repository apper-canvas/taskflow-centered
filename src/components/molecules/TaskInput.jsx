import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const TaskInput = ({ 
  onSubmit,
  categories = [],
  className = ''
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  
  const priorities = [
    { id: 'high', label: 'High', color: 'high' },
    { id: 'medium', label: 'Medium', color: 'medium' },
    { id: 'low', label: 'Low', color: 'low' }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
const taskData = {
      title: title.trim(),
      priority,
      categoryId: categoryId ? parseInt(categoryId, 10) : null,
      dueDate: dueDate || null,
      completed: false
    };
    
    onSubmit?.(taskData);
    
    // Reset form
    setTitle('');
    setPriority('medium');
    setCategoryId('');
    setDueDate('');
    setShowOptions(false);
  };
  
  return (
    <motion.div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon="Plus"
              iconPosition="left"
            />
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowOptions(!showOptions)}
            icon={showOptions ? 'ChevronUp' : 'ChevronDown'}
          />
          
          <Button
            type="submit"
            disabled={!title.trim()}
            icon="Plus"
          >
            Add Task
          </Button>
        </div>
        
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 border-t pt-4"
          >
            {/* Priority Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="flex gap-2">
                {priorities.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriority(p.id)}
                    className={`transition-all duration-150 ${
                      priority === p.id ? 'scale-105' : 'hover:scale-102'
                    }`}
                  >
                    <Badge
                      variant={priority === p.id ? p.color : 'default'}
                      pulse={priority === p.id}
                    >
                      {p.label}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category Selection */}
            {categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-ring"
                >
                  <option value="">No category</option>
                  {categories.map((category) => (
<option key={category.Id} value={category.Id}>
                      {category.Name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                icon="Calendar"
                iconPosition="left"
              />
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TaskInput;