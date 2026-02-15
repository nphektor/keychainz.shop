
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../hooks/useCart';

const ProductModalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const product = PRODUCTS.find(p => p.id === parseInt(id || '0'));

  const handleClose = React.useCallback(() => {
    navigate(-1); // Go back in history, which closes the modal
  }, [navigate]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  if (!product) {
    useEffect(() => {
      handleClose();
    }, [handleClose]);
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-brand-card rounded-xl overflow-hidden w-full max-w-4xl relative"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'fade-in-scale 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 z-10 p-1 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
          aria-label="Close product details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="md:flex max-h-[90vh]">
            <div className="md:w-1/2">
                <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center overflow-y-auto">
                <span className="text-sm font-semibold text-brand-pink uppercase tracking-wider">{product.category}</span>
                <h1 className="text-4xl font-bold font-heading text-gray-900 my-3">{product.name}</h1>
                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                    <span className="text-4xl font-bold text-brand-blue">${product.price.toFixed(2)}</span>
                    <button 
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`px-8 py-3 rounded-full font-bold text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brand-pink/50 disabled:opacity-75 ${
                            isAdded 
                            ? 'bg-green-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-brand-pink to-brand-blue hover:brightness-110'
                        }`}
                    >
                    {isAdded ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-scale {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProductModalPage;
