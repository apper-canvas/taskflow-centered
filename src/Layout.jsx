import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from './App'
import ApperIcon from './components/ApperIcon'
import Button from './components/atoms/Button'
function Layout() {
  const { isInitialized, logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  
  if (!isInitialized) {
    return (
      <div className="loading flex items-center justify-center p-6 h-full w-full">
        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4"></path>
          <path d="m16.2 7.8 2.9-2.9"></path>
          <path d="M18 12h4"></path>
          <path d="m16.2 16.2 2.9 2.9"></path>
          <path d="M12 18v4"></path>
          <path d="m4.9 19.1 2.9-2.9"></path>
          <path d="M2 12h4"></path>
          <path d="m4.9 4.9 2.9 2.9"></path>
        </svg>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-50">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {user?.firstName} {user?.lastName}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              icon="LogOut"
              className="text-gray-600 hover:text-error"
            >
              Logout
            </Button>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Layout;