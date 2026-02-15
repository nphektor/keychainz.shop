
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../hooks/useCart';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  const product = PRODUCTS.find(p => p.id === parseInt(id || '0'));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold font-heading">Product not found!</h2>
        <Link to="/" className="text-brand-pink hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-brand-card rounded-lg border border-brand-border overflow-hidden md:flex">
        <div className="md:w-1/2">
          <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-sm font-semibold text-brand-pink uppercase tracking-wider">{product.category}</span>
          <h1 className="text-4xl font-bold font-heading text-gray-900 my-3">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-brand-blue">${product.price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart}
              className={`px-8 py-3 rounded-full font-bold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-pink/50 ${
                isAdded 
                ? 'bg-green-500' 
                : 'bg-gradient-to-r from-brand-pink to-brand-blue hover:brightness-110'
              }`}
            >
              {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
