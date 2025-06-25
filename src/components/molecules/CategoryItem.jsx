import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const CategoryItem = ({ 
  category,
  taskCount = 0,
  isActive = false,
  onClick,
  onEdit,
  onDelete,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);
  
  const handleSaveEdit = () => {
    if (editName.trim() && editName !== category.name) {
      onEdit?.(category.Id, { name: editName.trim() });
    }
    setIsEditing(false);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditName(category.name);
      setIsEditing(false);
    }
  };
  
  return (
    <motion.div
      className={`group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-150 ${
        isActive 
          ? 'bg-primary/10 text-primary border border-primary/20' 
          : 'hover:bg-gray-50 text-gray-700'
      } ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`w-3 h-3 rounded-full category-${category.color} flex-shrink-0`}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400 }}
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyPress}
            onClick={(e) => e.stopPropagation()}
            className="w-full px-2 py-1 text-sm border border-primary rounded focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-between">
            <span className="font-medium truncate">
              {category.name}
            </span>
            <span className="text-xs opacity-75 ml-2">
              {taskCount}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            icon="Edit2"
            className="w-6 h-6 text-gray-400 hover:text-gray-600"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(category.Id);
            }}
            icon="Trash2"
            className="w-6 h-6 text-error/60 hover:text-error"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryItem;