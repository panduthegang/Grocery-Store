import { motion } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AuthButtons = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/login"
          className="flex items-center gap-2 bg-white/90 text-green-700 px-4 py-2 rounded-full hover:bg-white transition-colors"
        >
          <LogIn size={18} />
          <span>Login</span>
        </Link>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/signup"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
        >
          <UserPlus size={18} />
          <span>Sign Up</span>
        </Link>
      </motion.div>
    </div>
  );
};