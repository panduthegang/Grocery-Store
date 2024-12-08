import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { categories } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome, {user?.displayName || 'User'}!
          </h1>
          <p className="text-green-100">Choose a category to start shopping</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};