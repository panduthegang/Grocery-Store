import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Leaf, Sun, Droplet, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80')] bg-cover bg-fixed">
      <div className="bg-black/40 min-h-screen">
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold mb-6 text-white">
              Farm Fresh
              <span className="block text-green-400">Organic Vegetables</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">From our fields to your table - 100% Organic & Vegan</p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <ShoppingBag className="mr-2" />
              Shop Fresh
              <ArrowRight className="ml-2" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 p-6 rounded-lg text-center"
            >
              <Sun className="mx-auto mb-4 text-yellow-500" size={40} />
              <h3 className="text-xl font-bold mb-2">100% Organic</h3>
              <p className="text-gray-600">Grown without harmful pesticides</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 p-6 rounded-lg text-center"
            >
              <Droplet className="mx-auto mb-4 text-blue-500" size={40} />
              <h3 className="text-xl font-bold mb-2">Fresh Daily</h3>
              <p className="text-gray-600">Harvested every morning</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 p-6 rounded-lg text-center"
            >
              <Wind className="mx-auto mb-4 text-green-500" size={40} />
              <h3 className="text-xl font-bold mb-2">Local Farming</h3>
              <p className="text-gray-600">Supporting local communities</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center bg-white/90 p-8 rounded-xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <Leaf className="text-green-600 mr-2" />
                <span className="text-green-600 font-semibold">Vegan & Organic</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Straight from Nature</h2>
              <p className="text-gray-600 mb-6">
                Our vegetables are grown with love and care, using traditional farming methods
                that respect the environment and promote biodiversity.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                View Our Products
                <ArrowRight className="ml-2" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <img
                src="https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Fresh Vegetables"
                className="rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};