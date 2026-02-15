import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const location = useLocation();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevents the link from navigating
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-brand-card rounded-xl overflow-hidden border border-brand-border hover:border-brand-pink/50 transition-colors duration-300 group flex flex-col">
      <Link 
        to={`/product/${product.id}`} 
        state={{ background: location }}
        className="block flex flex-col flex-grow"
      >
        <div className="relative">
          <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
           <div className="absolute bottom-0 right-0 bg-brand-pink text-white px-3 py-1 m-4 rounded-full text-sm font-bold">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <div className="p-5 flex-grow">
          <h3 className="text-xl font-bold font-heading text-gray-900 truncate">{product.name}</h3>
        </div>
        <div className="px-5 pb-5">
           <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full px-4 py-2 rounded-full font-bold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-pink/50 disabled:opacity-75 ${
                isAdded 
                ? 'bg-green-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-brand-pink to-brand-blue hover:brightness-110'
              }`}
            >
              {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;