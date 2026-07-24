// src/pages/ProductDetail.jsx - Complete with Add to Cart
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Star,
  ShoppingCart,
  CreditCard,
  Plus,
  Minus,
  Heart,
  Share2,
  Shield,
  Truck,
  RefreshCw,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Clock,
  Headphones,
  Package
} from "lucide-react";
import { MyCartProduct } from "../context/CartProvider";
import { MyProducts } from "../context/ProductsProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "sonner";
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const { productsData } = useContext(MyProducts);
  const { 
    addToCart, 
    isItemAdded, 
    cartItems,
    getTotalItems,
    proceddToCheckOut
  } = useContext(MyCartProduct);
  const navigate = useNavigate();
  
  // Local state
  const [singleProduct, setSingleProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Fetch single product
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setSingleProduct(res.data);
        setQuantity(1);
      } catch (error) {
        console.log("API Error:", error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getSingleProduct();
    }
  }, [id]);

  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === singleProduct.id);
  const isItemJustAdded = isItemAdded(singleProduct.id);

  const totalPrice = (singleProduct.price || 0) * quantity;

  // Get related products
  const relatedProducts = productsData
    ?.filter(p => p.category === singleProduct.category && p.id !== singleProduct.id)
    .slice(0, 4) || [];

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      "electronics": "💻",
      "jewelery": "💎",
      "men's clothing": "👔",
      "women's clothing": "👗"
    };
    return icons[category] || "📦";
  };

  const handleAddToCart = () => {
    if (singleProduct.id) {
      addToCart(singleProduct, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  // Wishlist handler
  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast[isWishlisted ? 'info' : 'success'](
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist ❤️'
    );
  };

  // Quantity handlers
  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // No product found
  if (!singleProduct || Object.keys(singleProduct).length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <Package size={64} className="text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Product not found</h2>
            <p className="text-gray-400 mt-2">The product you're looking for doesn't exist</p>
            <button
              onClick={() => navigate('/products')}
              className="mt-6 bg-lime-400 text-black px-6 py-2 rounded-xl font-medium hover:bg-lime-300 transition"
            >
              Browse Products
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock images for gallery
  const images = [singleProduct.image, singleProduct.image, singleProduct.image, singleProduct.image];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition bg-[#1d1d1d] border border-white/10 px-4 py-2 rounded-xl hover:border-lime-400/50"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
          Back to Products
        </button>
      </div>

      {/* Main Product Section */}
      <section className="container mx-auto px-4 py-4">
        <div className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-10">
            
            {/* LEFT - Image Gallery */}
            <div className="space-y-4">
              <div className="relative bg-gradient-to-br from-lime-400/5 to-transparent rounded-2xl overflow-hidden group">
                <img
                  src={images[selectedImage] || singleProduct.image}
                  alt={singleProduct.title}
                  className="w-full h-[400px] md:h-[500px] object-contain p-8 group-hover:scale-105 transition duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {singleProduct.rating?.rate >= 4.5 && (
                    <span className="bg-lime-400 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Sparkles size={12} />
                      Top Rated
                    </span>
                  )}
                  {singleProduct.price < 50 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      🔥 Sale
                    </span>
                  )}
                  {singleProduct.price > 100 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      Premium
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={handleWishlist}
                    className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <Heart 
                      size={18} 
                      className={`transition ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`}
                    />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition">
                    <Share2 size={18} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-[#1d1d1d] border rounded-xl p-2 transition ${
                      selectedImage === index 
                        ? 'border-lime-400' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-20 object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT - Product Info */}
            <div className="flex flex-col">
              {/* Category */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCategoryIcon(singleProduct.category)}</span>
                <span className="text-lime-400 font-medium text-sm bg-lime-400/10 px-4 py-1.5 rounded-full">
                  {singleProduct.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 leading-tight">
                {singleProduct.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.round(singleProduct.rating?.rate || 0)
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-medium">
                  {singleProduct.rating?.rate}
                </span>
                <span className="text-gray-500 text-sm">
                  ({singleProduct.rating?.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <div className="flex items-end gap-4">
                  <h2 className="text-5xl font-bold text-lime-400">
                    ${singleProduct.price}
                  </h2>
                  {singleProduct.price > 100 && (
                    <span className="text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                      Free shipping
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-1">Price per item</p>
              </div>

              {/* Description */}
              <div className="mt-6 bg-[#1d1d1d] rounded-2xl p-5 border border-white/5">
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {singleProduct.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-2 bg-[#1d1d1d] border border-white/5 rounded-xl px-4 py-3">
                  <Truck size={16} className="text-lime-400" />
                  <span className="text-gray-300 text-sm">Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1d1d1d] border border-white/5 rounded-xl px-4 py-3">
                  <Shield size={16} className="text-lime-400" />
                  <span className="text-gray-300 text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1d1d1d] border border-white/5 rounded-xl px-4 py-3">
                  <RefreshCw size={16} className="text-lime-400" />
                  <span className="text-gray-300 text-sm">30-Day Return</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1d1d1d] border border-white/5 rounded-xl px-4 py-3">
                  <Clock size={16} className="text-lime-400" />
                  <span className="text-gray-300 text-sm">24/7 Support</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <h3 className="font-semibold text-white mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrement}
                    className="w-12 h-12 rounded-xl bg-[#1d1d1d] border border-white/10 hover:border-lime-400 flex items-center justify-center transition group"
                  >
                    <Minus size={20} className="text-gray-400 group-hover:text-lime-400" />
                  </button>
                  <span className="text-3xl font-bold text-white w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increment}
                    className="w-12 h-12 rounded-xl bg-lime-400 hover:bg-lime-300 text-black flex items-center justify-center transition hover:scale-105"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-6 bg-gradient-to-r from-lime-400/10 to-transparent border border-lime-400/20 rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Price</p>
                    <p className="text-3xl font-bold text-lime-400">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm">{quantity} × ${singleProduct.price}</p>
                    <p className="text-green-400 text-sm">✓ In Stock</p>
                  </div>
                </div>
              </div>

              {/* ✅ Add to Cart Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={handleAddToCart}
                  className={`cursor-pointer flex-1 py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3 ${
                    isAdded || isInCart
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-lime-400 hover:bg-lime-300 text-black hover:scale-105'
                  }`}
                >
                  {(isAdded || isInCart) ? (
                    <>
                      <CheckCircle size={22} />
                      {isInCart && !isAdded ? 'In Cart' : 'Added to Cart'}
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={22} />
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button onClick={proceddToCheckOut} className="cursor-pointer flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3 hover:scale-105">
                  <CreditCard size={22} />
                  Buy Now
                </button>
              </div>

              {/* ✅ Show cart quantity badge */}
              {isInCart && (
                <div className="mt-3 text-center">
                  <span className="text-sm text-gray-400">
                    In cart: {cartItems.find(item => item.id === singleProduct.id)?.quantity || 0} items
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">
                You May Also <span className="text-lime-400">Like</span>
              </h2>
              <p className="text-gray-400 mt-1">Products similar to this one</p>
            </div>
            <button 
              onClick={() => navigate('/products')}
              className="text-lime-400 hover:underline flex items-center gap-2 group"
            >
              View All
              <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/shoppingcart/${product.id}`)}
                className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-lime-400/5 to-transparent p-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold text-sm line-clamp-1">
                    {product.title}
                  </p>
                  <p className="text-lime-400 font-bold mt-1">
                    ${product.price}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-gray-400 text-xs">{product.rating?.rate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-lime-400/10 flex items-center justify-center mb-3">
                <Truck size={24} className="text-lime-400" />
              </div>
              <p className="text-white font-medium">Free Delivery</p>
              <p className="text-gray-500 text-sm">On orders 9999+</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-lime-400/10 flex items-center justify-center mb-3">
                <Shield size={24} className="text-lime-400" />
              </div>
              <p className="text-white font-medium">Secure Payment</p>
              <p className="text-gray-500 text-sm">100% encrypted</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-lime-400/10 flex items-center justify-center mb-3">
                <RefreshCw size={24} className="text-lime-400" />
              </div>
              <p className="text-white font-medium">Easy Returns</p>
              <p className="text-gray-500 text-sm">30-day policy</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-lime-400/10 flex items-center justify-center mb-3">
                <Headphones size={24} className="text-lime-400" />
              </div>
              <p className="text-white font-medium">24/7 Support</p>
              <p className="text-gray-500 text-sm">Dedicated team</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;