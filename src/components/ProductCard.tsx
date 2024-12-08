import { motion, useAnimation } from 'framer-motion';
import { ShoppingCart, Leaf } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { dispatch } = useCart();
  const controls = useAnimation();

  const handleAddToCart = async () => {
    const productElement = document.getElementById(`product-${product.id}`);
    const cartButton = document.querySelector('.cart-button');
    
    if (productElement && cartButton) {
      const productRect = productElement.getBoundingClientRect();
      const cartRect = cartButton.getBoundingClientRect();
      
      const startX = productRect.left + productRect.width / 2;
      const startY = productRect.top + productRect.height / 2;
      const endX = cartRect.left + cartRect.width / 2;
      const endY = cartRect.top + cartRect.height / 2;
      
      // Create a floating element
      const floatingEl = document.createElement('div');
      floatingEl.className = 'fixed pointer-events-none z-50 flex items-center justify-center';
      floatingEl.style.width = '50px';
      floatingEl.style.height = '50px';
      floatingEl.style.borderRadius = '50%';
      floatingEl.style.backgroundColor = '#22c55e';
      floatingEl.style.left = `${startX - 25}px`;
      floatingEl.style.top = `${startY - 25}px`;
      floatingEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>';
      
      document.body.appendChild(floatingEl);
      
      // Animate using spring physics
      const animation = floatingEl.animate([
        {
          transform: 'scale(1) translate(0, 0)',
          offset: 0
        },
        {
          transform: 'scale(1.2) translate(0, -20px)',
          offset: 0.4
        },
        {
          transform: `scale(0.5) translate(${endX - startX}px, ${endY - startY}px)`,
          offset: 1
        }
      ], {
        duration: 800,
        easing: 'cubic-bezier(.21,1.02,.73,1)',
      });
      
      animation.onfinish = () => {
        floatingEl.remove();
        dispatch({ type: 'ADD_TO_CART', payload: product });
      };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg group"
    >
      <div className="relative overflow-hidden">
        <motion.img
          id={`product-${product.id}`}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.organic && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <Leaf className="w-3 h-3 mr-1" />
            Organic
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-800">{formatPrice(product.price)}</span>
            <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            <ShoppingCart className="mr-2" size={18} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};