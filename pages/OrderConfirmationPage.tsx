import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-2xl mx-auto bg-brand-card p-10 rounded-lg border border-brand-border text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-3">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-6">Your order has been placed successfully. We've sent a confirmation to your email.</p>
        <Link to="/" className="inline-block bg-brand-pink text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors duration-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;