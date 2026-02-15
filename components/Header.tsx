import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);


const CartIcon = () => {
  const { cartCount } = useCart();
  return (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-amber-50/80 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <KeyIcon />
            <span className="text-2xl font-bold font-heading tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-blue">
              Keychainz.shop
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="text-gray-600 hover:text-brand-pink transition-colors duration-300">
              <CartIcon />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;