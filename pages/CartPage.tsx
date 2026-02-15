
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, shippingCost, totalPriceWithShipping } = useCart();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-heading text-center mb-10">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-10 bg-brand-card rounded-lg border border-brand-border">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <Link to="/" className="mt-6 inline-block bg-brand-pink text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center bg-brand-card p-4 rounded-lg border border-brand-border">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4"/>
                <div className="flex-grow">
                  <h2 className="text-lg font-bold font-heading">{item.name}</h2>
                  <p className="text-brand-blue font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <input 
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 bg-gray-50 text-gray-900 text-center rounded-md border border-brand-border focus:ring-brand-pink focus:border-brand-pink transition"
                        min="1"
                    />
                </div>
                 <div className="text-lg font-bold w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                 </div>
                <button onClick={() => removeFromCart(item.id)} className="ml-4 text-gray-400 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-brand-card p-6 rounded-lg border border-brand-border sticky top-28">
              <h2 className="text-2xl font-bold font-heading mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="border-t border-brand-border my-4"></div>
              <div className="flex justify-between font-bold text-xl mb-6">
                <span>Total</span>
                <span>${totalPriceWithShipping.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="w-full block text-center bg-gradient-to-r from-brand-pink to-brand-blue hover:brightness-110 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
