
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const heroSnippets = [
  "Your keys are boring. We're here to fix that. Dive into a universe of quirky, cool, and classy keychains that scream 'YOU'.",
  "Discover the most unique and vibrant keychains to accessorize your life. From retro vibes to futuristic designs, find the perfect charm that tells your story."
];

const Hero = () => {
  const [snippet, setSnippet] = useState('');

  useEffect(() => {
    setSnippet(heroSnippets[Math.floor(Math.random() * heroSnippets.length)]);
  }, []);

  return (
    <div className="relative overflow-hidden bg-brand-bg">
      {/* Headline Container */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-9 pt-20 sm:pt-28 text-center relative z-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading tracking-tight mb-8">
          <span className="block text-gray-900">Don't Be a Drag.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">Get a Swag Tag.</span>
        </h1>
      </div>
      {/* Snippet Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 text-center relative z-10">
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
          {snippet}
        </p>
      </div>
    </div>
  );
};

// NOTE: Set to 5 to demonstrate with current 10 products. Can be changed to 30.
const ITEMS_PER_LOAD = 5;

const ProductList = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_LOAD);

  useEffect(() => {
    // Create a shuffled copy of all products to display
    const shuffled = [...PRODUCTS].sort(() => 0.5 - Math.random());
    setAllProducts(shuffled);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_LOAD);
  };
  
  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <div id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {visibleCount < allProducts.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="bg-gradient-to-r from-brand-pink to-brand-blue hover:brightness-110 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-pink/50"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <ProductList />
    </div>
  );
};

export default HomePage;
