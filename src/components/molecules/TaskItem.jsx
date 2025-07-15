import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isPast, parseISO } from 'date-fns';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const TaskItem = ({ 
  task,
  category,
  onToggleComplete,
  onEdit,
  onDelete,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(task.title_c);
  const [isCompleting, setIsCompleting] = useState(false);
  
const isDue = task.due_date_c && isToday(parseISO(task.due_date_c));
  const isOverdue = task.due_date_c && isPast(parseISO(task.due_date_c)) && !isToday(parseISO(task.due_date_c));
  
const handleToggleComplete = async () => {
    if (task.completed_c) {
      onToggleComplete?.(task.Id);
      return;
    }
    
    setIsCompleting(true);
    
    // Show confetti effect
    createConfetti();
    
    // Wait for animation
    setTimeout(() => {
      onToggleComplete?.(task.Id);
      setIsCompleting(false);
    }, 400);
  };
  
  const createConfetti = () => {
    const colors = ['#5B67E9', '#FF6B6B', '#4ECDC4', '#FFD93D'];
    
    for (let i = 0; i < 10; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  };
  
const handleSaveEdit = () => {
    if (editTitle.trim() && editTitle !== task.title_c) {
      onEdit?.(task.Id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
} else if (e.key === 'Escape') {
      setEditTitle(task.title_c);
      setIsEditing(false);
    }
  };
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isCompleting ? 0 : 1, 
        y: 0,
        x: isCompleting ? 100 : 0
      }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.2 }}
className={`group bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-150 ${
        task.completed_c ? 'opacity-60' : ''
      } ${isCompleting ? 'task-completing' : ''} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">
<Checkbox
            checked={task.completed_c}
            onChange={handleToggleComplete}
            size="md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyPress}
              className="w-full px-2 py-1 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          ) : (
<h3 
              className={`font-medium text-gray-900 cursor-pointer hover:text-primary transition-colors ${
                task.completed_c ? 'line-through' : ''
              }`}
              onClick={() => setIsEditing(true)}
>
              {task.title_c}
            </h3>
          )}
          
<div className="flex items-center gap-2 mt-2">
            {task.priority_c && (
              <Badge variant={task.priority_c} size="sm">
                {task.priority_c}
              </Badge>
            )}
            
{category && (
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full category-${category.color_c}`} />
                <span className="text-xs text-gray-500">{category.Name}</span>
              </div>
            )}
            
{task.due_date_c && (
              <div className={`flex items-center gap-1 text-xs ${
                isOverdue ? 'text-error' : isDue ? 'text-warning' : 'text-gray-500'
              }`}>
                <ApperIcon name="Calendar" size={12} />
                <span>
                  {isToday(parseISO(task.due_date_c)) 
                    ? 'Today' 
                    : format(parseISO(task.due_date_c), 'MMM d')
                  }
                </span>
                {isOverdue && <ApperIcon name="AlertCircle" size={12} />}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              icon="Edit2"
              className="w-8 h-8"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete?.(task.Id)}
              icon="Trash2"
              className="w-8 h-8 text-error hover:bg-error/10"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;