import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './App';
import ApperIcon from './components/ApperIcon';

function Layout() {
  const { logout } = useContext(AuthContext);
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ApperIcon name="LogOut" size={18} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </header>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;