import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { products } from '../data/products';
import { categories } from '../data/categories';

export const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.toLowerCase() === selectedCategory.replace('-', ' '))
    : products;

  const subCategories = Array.from(
    new Set(filteredProducts.map(p => p.subCategory))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-green-900 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Fresh & Organic
        </motion.h1>

        {!selectedCategory ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
              <button
                onClick={() => setSelectedSubCategory('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedSubCategory === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All
              </button>
              {subCategories.map(subCat => (
                <button
                  key={subCat}
                  onClick={() => setSelectedSubCategory(subCat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedSubCategory === subCat
                      ? 'bg-green-600 text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts
                .filter(
                  p =>
                    selectedSubCategory === 'all' ||
                    p.subCategory === selectedSubCategory
                )
                .map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};