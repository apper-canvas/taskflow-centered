import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from '@/components/molecules/TaskItem';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskList = ({ 
  tasks = [],
  categories = [],
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  sortBy = 'order',
  groupBy = null,
  className = ''
}) => {
  const [sortedTasks, setSortedTasks] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});
  
  useEffect(() => {
    let processed = [...tasks];
    
    // Sort tasks
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        processed.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'dueDate':
        processed.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      case 'title':
        processed.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        processed.sort((a, b) => a.order - b.order);
    }
    
    setSortedTasks(processed);
    
    // Group tasks if needed
    if (groupBy) {
      const groups = {};
      processed.forEach(task => {
        let groupKey;
        switch (groupBy) {
          case 'status':
            groupKey = task.completed ? 'Completed' : 'Active';
            break;
          case 'priority':
            groupKey = task.priority ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1) : 'No Priority';
            break;
          case 'category':
            const category = categories.find(c => c.Id === task.categoryId);
            groupKey = category ? category.name : 'No Category';
            break;
          default:
            groupKey = 'All Tasks';
        }
        
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(task);
      });
      setGroupedTasks(groups);
    }
  }, [tasks, categories, sortBy, groupBy]);
  
  const getCategoryForTask = (task) => {
    return categories.find(c => c.Id === task.categoryId);
  };
  
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="CheckSquare" className="w-16 h-16 text-gray-300 mx-auto" />
        </motion.div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks yet</h3>
        <p className="mt-2 text-gray-500">Create your first task to get organized</p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4"
        >
          <Button
            variant="primary"
            icon="Plus"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Your First Task
          </Button>
        </motion.div>
      </motion.div>
    );
  }
  
  if (groupBy && Object.keys(groupedTasks).length > 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {Object.entries(groupedTasks).map(([groupName, groupTasks]) => (
          <motion.div
            key={groupName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              {groupName}
              <span className="text-sm text-gray-500 font-normal">
                ({groupTasks.length})
              </span>
            </h3>
            <div className="space-y-2">
              <AnimatePresence>
                {groupTasks.map((task, index) => (
                  <motion.div
                    key={task.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.05 
                    }}
                  >
                    <TaskItem
                      task={task}
                      category={getCategoryForTask(task)}
                      onToggleComplete={onToggleComplete}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
  
  return (
    <div className={`space-y-2 ${className}`}>
      <AnimatePresence>
        {sortedTasks.map((task, index) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ 
              duration: 0.2, 
              delay: index * 0.05 
            }}
          >
            <TaskItem
              task={task}
              category={getCategoryForTask(task)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;