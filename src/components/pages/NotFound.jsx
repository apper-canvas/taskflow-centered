import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="mb-8"
        >
          <ApperIcon name="Search" className="w-24 h-24 text-gray-300 mx-auto" />
        </motion.div>
        
        <motion.h1
          className="text-6xl font-display font-bold text-gray-900 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          404
        </motion.h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          Looks like this page took a productivity break. 
          Let's get you back to your tasks!
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={() => navigate('/')}
            icon="Home"
            size="lg"
            className="w-full sm:w-auto"
          >
            Back to Tasks
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>Lost? Try checking your task categories or search for what you need.</p>
          </div>
        </div>
        
        {/* Decorative Task Icons */}
        <motion.div
          className="mt-12 flex justify-center gap-4 opacity-20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.2 }}
          transition={{ delay: 0.8 }}
        >
          <ApperIcon name="CheckSquare" className="w-6 h-6" />
          <ApperIcon name="Calendar" className="w-6 h-6" />
          <ApperIcon name="AlertCircle" className="w-6 h-6" />
          <ApperIcon name="List" className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;