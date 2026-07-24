import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Zap,
  ShoppingBag,
  Star,
  TrendingUp,
  Package,
  ArrowRight,
  Clock,
  Shield,
  Tag,
  Sparkles,
  ChevronRight,
  Eye,
  Heart,
  Gift,
  Truck,
  CreditCard,
  Award,
  Users,
  MapPin,
  Loader2,
  ChevronDown,
  LayoutGrid,
  DollarSign
} from 'lucide-react';
import { useLocation } from '../hooks/useLocation';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MyAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router';
import { MyProducts } from '../context/ProductsProvider';
import { MyCartProduct } from '../context/CartProvider';

const Home = () => {
  const { currentUser } = useContext(MyAuth);
  const { cartItems } = useContext(MyCartProduct)
  const { categories, countCategories, productsData } = useContext(MyProducts);
  const { city, state, country, loading, error, refreshLocation } = useLocation();
  const [currentTime, setCurrentTime] = useState('');
  const [isLocationHighlighted, setIsLocationHighlighted] = useState(false);
  const locationRef = useRef(null);
  const navigate = useNavigate();
  console.log(cartItems)

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 17) greeting = 'Good Afternoon';
    else if (hour < 21) greeting = 'Good Evening';
    else greeting = 'Good Night';
    setCurrentTime(greeting);
  }, []);

  useEffect(() => {
    if (!loading && locationRef.current) {
      setTimeout(() => {
        locationRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        setIsLocationHighlighted(true);

        // Show toast with location
        const locationText = [city, state, country].filter(Boolean).join(', ');
        if (locationText) {
          toast.success(`📍 ${locationText}`, {
            description: 'Your location detected for better shopping experience',
            duration: 4000,
            closeButton: true
            // icon: '📍',
          });
        }

        // Remove highlight after 4 seconds
        setTimeout(() => {
          setIsLocationHighlighted(false);
        }, 4000);
      }, 800);
    }
  }, [loading, city, state, country]);

  const locationText = [city, state, country].filter(Boolean).join(', ');
  console.log(locationText)

  // Features Data
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same-day on select items',
      color: 'from-blue-500/20 to-blue-600/10'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: '100% encrypted checkout',
      color: 'from-green-500/20 to-green-600/10'
    },
    {
      icon: Tag,
      title: 'Best Prices',
      description: 'Price-match guarantee',
      color: 'from-purple-500/20 to-purple-600/10'
    }
  ];

  // Stats
  const stats = [
    { value: productsData.length, label: 'Products Available', icon: Package },
    { value: cartItems.length, label: 'Cart Items', icon: ShoppingBag },
    {
      value: `$${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`,
      label: 'Cart Value',
      icon: TrendingUp
    },
    { value: 'Free', label: 'Delivery on 2999+', icon: Truck },
    { value: categories.length, label: 'Categories', icon: LayoutGrid },
    { value: productsData.filter(product => product?.rating?.rate >= 4).length, label: 'Top Rated', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden mt-5">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-lime-400/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/3 blur-[200px] rounded-full"></div>

        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Location Badge - With Focus */}
            <div
              ref={locationRef}
              className={`inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border rounded-full px-6 py-3 mb-8 transition-all duration-700 cursor-pointer ${isLocationHighlighted
                ? 'border-lime-400 scale-105 shadow-[0_0_60px_rgba(132,204,22,0.3)] ring-2 ring-lime-400/50'
                : 'border-white/10 hover:border-lime-400/50 hover:scale-105'
                }`}
              onClick={() => refreshLocation()}
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="text-lime-400 animate-spin" />
                  <span className="text-gray-300">Detecting your location...</span>
                </>
              ) : error ? (
                <>
                  <MapPin size={20} className="text-red-400" />
                  <span className="text-red-400">Location unavailable — tap to retry</span>
                </>
              ) : (
                <>
                  <MapPin size={20} className="text-lime-400" />
                  <span className="text-white font-medium">
                    {locationText || 'Location not available'}
                  </span>
                  {isLocationHighlighted && (
                    <span className="text-lime-400 text-sm animate-pulse flex items-center gap-1">
                      <span className="w-2 h-2 bg-lime-400 rounded-full animate-ping"></span>
                      You are here!
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Greeting */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl">👋</span>
              <span className="text-gray-300 text-2xl font-light">{currentTime}</span>
            </div>

            {/* Welcome Message */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
              <span className="text-white">Welcome back,</span>
              <br />
              <span className="bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 bg-clip-text text-transparent">
                {currentUser?.fullName?.split(' ')[0] || 'Guest'}!
              </span>
            </h1>

            <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover today's picks — hand-curated products across
              electronics, fashion, and more.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <button onClick={() => navigate('/products')} className="cursor-pointer group bg-lime-400 hover:bg-lime-300 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 hover:scale-105 active:scale-95 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40">
                <Sparkles size={22} />
                Shop Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
              </button>
              <button onClick={() => navigate('/products')} className="cursor-pointer group border border-white/20 hover:border-lime-400 px-8 py-4 rounded-2xl font-medium text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95">
                <Eye size={20} />
                View All Products
                <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <ChevronDown size={32} className="text-gray-500 mx-auto" />
              <p className="text-gray-500 text-sm mt-2">Scroll to explore</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${feature.color} border border-white/10 rounded-3xl p-8 hover:border-lime-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-400/5`}
            >
              <div className="w-14 h-14 rounded-2xl bg-lime-400/10 flex items-center justify-center mb-5 group-hover:bg-lime-400/20 transition group-hover:scale-110">
                <feature.icon className="text-lime-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Shop by <span className="text-lime-400">Category</span>
            </h2>
            <p className="text-gray-400 mt-2">
              {loading ? 'Loading categories...' : `Explore our wide range of products`}
            </p>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="cursor-pointer text-lime-400 font-medium hover:underline flex items-center gap-2 group"
          >
            View All
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-[#1d1d1d] rounded-2xl p-6 h-28 animate-pulse">
                <div className="w-10 h-10 bg-gray-700 rounded-full mx-auto"></div>
                <div className="h-4 bg-gray-700 rounded mt-3 mx-auto w-16"></div>
                <div className="h-3 bg-gray-700 rounded mt-2 mx-auto w-12"></div>
              </div>
            ))}
          </div>
        ) : (
          /* ✅ Categories Grid - Dynamic from API */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(`/products?category=${category.name}`)}
                className={`group bg-gradient-to-br ${category.bg} bg-[#111111] border border-white/10 rounded-2xl p-6 text-center hover:border-lime-400 hover:bg-[#1a1a1a] transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold group-hover:text-lime-400 transition capitalize text-sm">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  {category.items}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>


      {/* ===== STATS SECTION ===== */}
     // Alternative - Glassmorphism Style
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="relative overflow-hidden bg-gradient-to-br from-lime-400/5 to-transparent border border-white/10 rounded-3xl p-8 md:p-12 hover:border-lime-400/30 transition-all duration-500">

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/5 blur-[100px] rounded-full"></div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center">
                {/* Icon Container with Background */}
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-lime-400/20 to-transparent border border-lime-400/20 flex items-center justify-center group-hover:border-lime-400/50 group-hover:scale-110 transition-all duration-300">
                    <stat.icon size={28} className="text-lime-400" />
                  </div>
                </div>

                {/* Value */}
                <p className="text-2xl md:text-4xl font-bold text-white group-hover:text-lime-400 transition">
                  
                  {stat.value}
                </p>

                {/* Label */}
                <p className="text-gray-400 mt-1 text-sm md:text-base group-hover:text-gray-300 transition">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRENDING PRODUCTS PREVIEW ===== */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Top <span className="text-lime-400">Rated</span>
            </h2>
            <p className="text-gray-400 mt-2">Most popular items this week</p>
          </div>
          <button onClick={() => navigate('/products')} className="cursor-pointer text-lime-400 font-medium hover:underline flex items-center gap-2 group">
            View All
            <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="group bg-[#111111] border border-white/10 rounded-2xl overflow-hidden hover:border-lime-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-400/5"
            >
              <div className="h-48 bg-gradient-to-br from-lime-400/10 to-transparent relative flex items-center justify-center">
                <Package size={48} className="text-gray-600 group-hover:text-lime-400 transition-colors" />
                <span className="absolute top-3 right-3 bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                  {item % 2 === 0 ? 'Hot' : 'New'}
                </span>
              </div>
              <div className="p-4">
                <p className="text-white font-semibold">${(24.99 + item * 25).toFixed(2)}</p>
                <p className="text-gray-500 text-sm truncate">Product {item}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <button className="mt-3 w-full bg-white/5 hover:bg-lime-400 hover:text-black text-white text-sm font-medium py-2 rounded-xl transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-lime-400/20 to-lime-500/5 border border-lime-400/30 rounded-3xl p-8 md:p-16 group hover:border-lime-400/50 transition-all duration-500">
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 blur-[150px] rounded-full group-hover:scale-150 transition duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[150px] rounded-full group-hover:scale-150 transition duration-1000"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="text-lime-400">Shop?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of happy customers and start shopping today
            </p>
            <button onClick={() => navigate('/products')} className="cursor-pointer bg-lime-400 hover:bg-lime-300 text-black px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40">
              <ShoppingBag size={22} />
              Start Shopping
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;