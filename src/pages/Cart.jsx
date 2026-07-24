// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus,
  ArrowLeft,
  ShoppingCart,
  X
} from 'lucide-react';
import { MyCartProduct } from '../context/CartProvider';
import { MyAuth } from '../context/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
    proceddToCheckOut
  } = useContext(MyCartProduct);
  const { currentUser } = useContext(MyAuth);
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
          <div className="w-32 h-32 rounded-full bg-[#1d1d1d] border border-white/10 flex items-center justify-center mb-8">
            <ShoppingCart size={64} className="text-gray-600" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Welcome back, {currentUser?.fullName || 'Guest'}! Go shop something cool!
          </p>
          <button
            onClick={() => navigate('/products')}
            className="cursor-pointer bg-lime-400 hover:bg-lime-300 text-black px-10 py-4 rounded-2xl font-bold text-lg transition flex items-center gap-2"
          >
            Browse Products
            <ArrowLeft size={20} className="rotate-180" />
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl border border-white/10 bg-[#1d1d1d] flex items-center justify-center hover:bg-[#2a2a2a] transition"
          >
            <ArrowLeft size={24} className="text-gray-400" />
          </button>
          <h1 className="text-4xl font-bold text-white">Your Cart</h1>
          <span className="bg-lime-400 text-black px-4 py-1 rounded-full font-bold">
            {totalItems} items
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-[#1d1d1d] border border-white/10 rounded-2xl p-4 hover:border-lime-400/30 transition group"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-lime-400/10 to-transparent flex items-center justify-center flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-semibold line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-lime-400 font-bold mt-1">
                          ${item.price?.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} className="text-red-400" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2 bg-[#2a2a2a] rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg hover:bg-[#333] flex items-center justify-center transition"
                        >
                          <Minus size={16} className="text-gray-400" />
                        </button>
                        <span className="text-white font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg hover:bg-[#333] flex items-center justify-center transition"
                        >
                          <Plus size={16} className="text-gray-400" />
                        </button>
                      </div>
                      <span className="text-gray-400 text-sm">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-[#1d1d1d] border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
            
            <div className="space-y-3 border-b border-white/10 pb-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-lime-400">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mt-4 mb-6">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-2xl font-bold text-lime-400">
                ${(totalPrice + totalPrice * 0.1).toFixed(2)}
              </span>
            </div>

            <button onClick={proceddToCheckOut} className="cursor-pointer w-full bg-lime-400 hover:bg-lime-300 text-black py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-2">
              Proceed to Checkout
              <ArrowLeft size={20} className="rotate-180" />
            </button>

            <button
              onClick={clearCart}
              className="cursor-pointer w-full mt-3 bg-[#2a2a2a] hover:bg-[#333] text-gray-400 py-3 rounded-2xl font-medium transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;