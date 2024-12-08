import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Category } from '../types/product';

interface CategoryCardProps {
  category: Category;
  index: number;
}

export const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const Icon = Icons[category.icon as keyof typeof Icons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <Link
        to={`/products?category=${category.id}`}
        className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              {Icon && <Icon size={20} className="text-green-400" />}
              <h3 className="text-xl font-bold">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-200">{category.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};