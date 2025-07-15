import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import taskService from '@/services/api/taskService';
import categoryService from '@/services/api/categoryService';
import TaskInput from '@/components/molecules/TaskInput';
import TaskList from '@/components/organisms/TaskList';
import CategorySidebar from '@/components/organisms/CategorySidebar';
import TaskHeader from '@/components/organisms/TaskHeader';
import ApperIcon from '@/components/ApperIcon';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState('order');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [tasksData, categoriesData] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ]);
        
        setTasks(tasksData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    
    // Apply category filter
if (activeCategory) {
      filtered = filtered.filter(task => task.category_id_c === activeCategory);
    }
    
    // Apply status filter
    switch (activeFilter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'high':
        filtered = filtered.filter(task => task.priority === 'high');
        break;
      default:
        // 'all' - no additional filtering
        break;
    }
    
    // Apply search filter
if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title_c.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [tasks, activeCategory, activeFilter, searchQuery]);
  
  // Task counts for filters
  const taskCounts = useMemo(() => {
const base = activeCategory 
      ? tasks.filter(task => task.category_id_c === activeCategory)
      : tasks;
      
    return {
all: base.length,
      active: base.filter(task => !task.completed_c).length,
      completed: base.filter(task => task.completed_c).length,
      high: base.filter(task => task.priority_c === 'high' && !task.completed_c).length
    };
  }, [tasks, activeCategory]);
  
  // Task operations
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully');
    } catch (err) {
      toast.error('Failed to create task');
    }
  };
  
  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
if (updatedTask.completed_c) {
        toast.success('Task completed! 🎉');
      }
    } catch (err) {
      toast.error('Failed to update task');
    }
  };
  
  const handleEditTask = async (taskId, updateData) => {
    try {
      const updatedTask = await taskService.update(taskId, updateData);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      toast.success('Task updated');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success('Task deleted');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };
  
  // Category operations
  const handleCreateCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      setCategories(prev => [...prev, newCategory]);
      toast.success('Category created');
    } catch (err) {
      toast.error('Failed to create category');
    }
  };
  
  const handleUpdateCategory = async (categoryId, updateData) => {
    try {
      const updatedCategory = await categoryService.update(categoryId, updateData);
      setCategories(prev => prev.map(cat => 
        cat.Id === categoryId ? updatedCategory : cat
      ));
      toast.success('Category updated');
    } catch (err) {
      toast.error('Failed to update category');
    }
  };
  
const handleDeleteCategory = async (categoryId) => {
    const tasksInCategory = tasks.filter(task => task.category_id_c === categoryId);
    
    if (tasksInCategory.length > 0) {
      if (!confirm(`This category contains ${tasksInCategory.length} tasks. Delete anyway?`)) {
        return;
      }
    }
    
    try {
      await categoryService.delete(categoryId);
      setCategories(prev => prev.filter(cat => cat.Id !== categoryId));
      
// Update tasks to remove category reference
      const updatedTasks = tasks.map(task => 
        task.category_id_c === categoryId 
          ? { ...task, category_id_c: null }
          : task
      );
      setTasks(updatedTasks);
      
      toast.success('Category deleted');
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };
  
  // Bulk operations
  const handleBulkActions = async (action) => {
    switch (action) {
      case 'markAllComplete':
const activeTasks = tasks.filter(task => !task.completed_c);
        if (activeTasks.length === 0) {
          toast.info('No active tasks to complete');
          return;
        }
        
        try {
          for (const task of activeTasks) {
            await taskService.toggleComplete(task.Id);
          }
          const updatedTasks = await taskService.getAll();
          setTasks(updatedTasks);
          toast.success(`Marked ${activeTasks.length} tasks as complete`);
        } catch (err) {
          toast.error('Failed to complete tasks');
        }
        break;
        
      case 'clearCompleted':
const completedTasks = tasks.filter(task => task.completed_c);
        if (completedTasks.length === 0) {
          toast.info('No completed tasks to clear');
          return;
        }
        
        if (!confirm(`Delete ${completedTasks.length} completed tasks?`)) {
          return;
        }
        
        try {
          for (const task of completedTasks) {
            await taskService.delete(task.Id);
          }
setTasks(prev => prev.filter(task => !task.completed_c));
          toast.success(`Cleared ${completedTasks.length} completed tasks`);
        } catch (err) {
          toast.error('Failed to clear completed tasks');
        }
        break;
    }
  };
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <ApperIcon name="Loader2" className="w-8 h-8 text-primary" />
          </motion.div>
          <p className="text-gray-600">Loading your tasks...</p>
        </motion.div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-error mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className={`w-80 flex-shrink-0 z-50 lg:relative lg:translate-x-0 ${
          isMobileSidebarOpen 
            ? 'fixed inset-y-0 left-0 translate-x-0' 
            : 'fixed inset-y-0 left-0 -translate-x-full lg:translate-x-0'
        } transition-transform duration-300 ease-in-out`}
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CategorySidebar
          categories={categories}
          tasks={tasks}
          activeCategory={activeCategory}
          onCategorySelect={(categoryId) => {
            setActiveCategory(categoryId);
            setIsMobileSidebarOpen(false);
          }}
          onCreateCategory={handleCreateCategory}
          onUpdateCategory={handleUpdateCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <TaskHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onBulkActions={handleBulkActions}
          taskCounts={taskCounts}
        />
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name="Menu" size={20} />
                <span className="text-sm font-medium">Categories</span>
              </motion.button>
            </div>
            
            {/* Task Input */}
            <TaskInput
              onSubmit={handleCreateTask}
              categories={categories}
            />
            
            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              categories={categories}
              onToggleComplete={handleToggleComplete}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              sortBy={sortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;