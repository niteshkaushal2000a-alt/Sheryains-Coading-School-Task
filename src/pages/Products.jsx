// src/pages/Products.jsx - Clean Version
import React, { useContext } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Sparkles,
  Package,
  Check
} from 'lucide-react';
import { MyProducts } from '../context/ProductsProvider';
import { MyCartProduct } from '../context/CartProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterBar from '../components/FilterBar';
import { useNavigate } from 'react-router';

const Products = () => {
  const { loading, filteredProductsData } = useContext(MyProducts);
  const { addToCart, isItemAdded, cartItems } = useContext(MyCartProduct);
  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    const icons = {
      "electronics": "💻",
      "jewelery": "💎",
      "men's clothing": "👔",
      "women's clothing": "👗"
    };
    return icons[category] || "📦";
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productsToShow = filteredProductsData;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                All <span className="text-lime-400">Products</span>
              </h1>
              <p className="text-gray-400 mt-2">
                {productsToShow.length} products found
              </p>
            </div>

            {/* ✅ Search Bar - Mobile visible */}
            <div className="md:hidden w-full">
              {/* You can add a mobile search here if needed */}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Filter Bar - Extracted Component */}
      <FilterBar />

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        {productsToShow.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Package size={64} className="text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-white">No products found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsToShow.map((product) => {
              const isAdded = isItemAdded(product.id);
              const isInCart = cartItems.some(item => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-400/5"
                >
                  {/* Image */}
                  <div
                    onClick={() => navigate(`/shoppingcart/${product.id}`)}
                    className="h-56 bg-gradient-to-br from-lime-400/5 to-transparent relative overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 group-hover:scale-110 transition duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.rating?.rate >= 4.5 && (
                        <span className="bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles size={12} />
                          Top Rated
                        </span>
                      )}
                      {product.price < 50 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Sale
                        </span>
                      )}
                      {product.price > 100 && (
                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition group/heart">
                      <Heart size={18} className="text-white group-hover/heart:text-red-400 transition" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-lime-400 font-medium mb-1 flex items-center gap-1">
                      <span>{getCategoryIcon(product.category)}</span>
                      {product.category}
                    </p>

                    <h3 className="text-white font-semibold line-clamp-2 group-hover:text-lime-400 transition">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${i < Math.round(product.rating?.rate || 0)
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-gray-600'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({product.rating?.count || 0})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.price > 100 && (
                          <p className="text-xs text-green-400">Free shipping</p>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2 rounded-xl font-medium transition flex items-center gap-2 ${isAdded || isInCart
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-lime-400 text-black hover:bg-lime-300 hover:scale-105'
                          }`}
                      >
                        {(isAdded || isInCart) ? (
                          <>
                            <Check size={16} />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} />
                            Add
                          </>
                        )}
                      </button>
                    </div>

                    {/* Show quantity badge if in cart */}
                    {isInCart && (
                      <div className="mt-2 text-xs text-gray-400">
                        In cart: {cartItems.find(item => item.id === product.id)?.quantity || 0}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Products;