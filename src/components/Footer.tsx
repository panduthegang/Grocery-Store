import { Facebook, Twitter, Instagram, Mail, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-green-400" />
              <h3 className="text-xl font-bold">Farm Fresh</h3>
            </div>
            <p className="text-gray-300">
              Bringing you the freshest organic vegetables straight from our sustainable farms
              to your table. 100% organic, 100% vegan.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Our Farm</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Visit Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Green Acres Farm</li>
              <li>Rural District, Maharashtra</li>
              <li>Phone: +91 98765 43210</li>
              <li>Email: farm@freshveggies.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Mail />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Farm Fresh Organics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};