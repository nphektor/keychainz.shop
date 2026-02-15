
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const InputField: React.FC<{label: string, id: string, type?: string, placeholder?: string}> = ({label, id, type="text", placeholder}) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input 
            type={type} 
            id={id} 
            name={id}
            placeholder={placeholder}
            required
            className="w-full bg-gray-50 border border-brand-border rounded-md py-2 px-3 focus:ring-brand-pink focus:border-brand-pink transition" 
        />
    </div>
);


const CheckoutPage: React.FC = () => {
    const { cartItems, totalPriceWithShipping, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            clearCart();
            navigate('/confirmation');
        }, 2000);
    };

    if (cartItems.length === 0 && !isProcessing) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold font-heading">Your cart is empty.</h2>
                <button onClick={() => navigate('/')} className="text-brand-pink hover:underline mt-4 inline-block">Go Shopping</button>
            </div>
        );
    }
    

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold font-heading text-center mb-10">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-brand-card p-8 rounded-lg border border-brand-border">
                <h2 className="text-2xl font-bold font-heading mb-6">Shipping Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField label="Full Name" id="fullName" placeholder="John Doe" />
                    <InputField label="Email" id="email" type="email" placeholder="you@example.com" />
                    <InputField label="Phone Number" id="phone" type="tel" placeholder="123-456-7890" />
                    <InputField label="Address" id="address" placeholder="123 Main St" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputField label="City" id="city" placeholder="Anytown" />
                        <InputField label="State / Province" id="state" placeholder="CA" />
                        <InputField label="ZIP / Postal Code" id="zip" placeholder="12345" />
                    </div>

                    <div className="pt-6">
                         <button 
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-gradient-to-r from-brand-pink to-brand-blue hover:brightness-110 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                            {isProcessing ? 'Processing...' : `Pay $${totalPriceWithShipping.toFixed(2)} via External Link`}
                        </button>
                         <p className="text-xs text-gray-500 text-center mt-2">You will be redirected to our secure payment partner.</p>
                    </div>
                </form>
            </div>
            <div className="lg:col-span-2">
                <div className="bg-brand-card p-6 rounded-lg border border-brand-border sticky top-28">
                    <h2 className="text-2xl font-bold font-heading mb-4">Your Order</h2>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                         {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <div>
                                        <p className="font-bold font-heading">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-brand-border my-4"></div>
                     <div className="flex justify-between font-bold text-xl">
                        <span>Total</span>
                        <span>${totalPriceWithShipping.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CheckoutPage;
