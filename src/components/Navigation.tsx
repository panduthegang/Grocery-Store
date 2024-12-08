import { motion } from 'framer-motion';
import { Home, ShoppingBag, Clock, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logOut } from '../services/auth';

export const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const links = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/products', icon: ShoppingBag, label: 'Products' },
    { path: '/orders', icon: Clock, label: 'Orders' },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  } transition-colors`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.label}
                </Link>
              );
            })}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </motion.button>
        </div>
      </div>
    </nav>
  );
};