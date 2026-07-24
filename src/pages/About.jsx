// src/pages/About.jsx
import React from 'react';
import { 
  Zap, 
  Shield, 
  Truck, 
  Award, 
  Users, 
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ShoppingBag,
  CreditCard,
  Headphones,
  Globe,
  Lock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  // Stats Data
  const stats = [
    { value: '50K+', label: 'Happy Customers', icon: Users },
    { value: '20K+', label: 'Products', icon: ShoppingBag },
    { value: '4.9★', label: 'Average Rating', icon: Star },
    { value: '99.9%', label: 'Satisfaction Rate', icon: Award },
  ];

  // Features Data
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Lightning-fast shipping with real-time tracking',
      color: 'from-blue-500/20 to-blue-600/10'
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: '100% encrypted transactions and data protection',
      color: 'from-green-500/20 to-green-600/10'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated customer service team always ready to help',
      color: 'from-purple-500/20 to-purple-600/10'
    },
    {
      icon: CreditCard,
      title: 'Easy Payments',
      description: 'Multiple payment options for your convenience',
      color: 'from-orange-500/20 to-orange-600/10'
    },
  ];

  // Team Members
  const team = [
    { name: 'Nitesh Jha', role: 'Founder & CEO', avatar: 'NJ', color: 'from-lime-400 to-emerald-500' },
    { name: 'Priya Sharma', role: 'Head of Design', avatar: 'PS', color: 'from-pink-400 to-rose-500' },
    { name: 'Amit Kumar', role: 'Lead Developer', avatar: 'AK', color: 'from-blue-400 to-indigo-500' },
    { name: 'Sneha Patel', role: 'Marketing Director', avatar: 'SP', color: 'from-purple-400 to-violet-500' },
  ];

  // Values
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else'
    },
    {
      icon: Sparkles,
      title: 'Quality Focus',
      description: 'Committed to delivering only the best products'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting customers worldwide with premium products'
    },
    {
      icon: Lock,
      title: 'Trust & Security',
      description: 'Your data and transactions are always protected'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-400/10 via-transparent to-transparent"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lime-400/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 blur-[120px] rounded-full"></div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-lime-400/10 border border-lime-400/20 rounded-full px-4 py-2 mb-6">
              <Zap size={16} className="text-lime-400" />
              <span className="text-lime-400 text-sm font-medium">About SkyMart</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              We're on a mission to 
              <span className="text-lime-400 block mt-2">redefine shopping</span>
            </h1>

            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              SkyMart is your one-stop destination for premium shopping. 
              We curate the best products, offer lightning-fast delivery, 
              and provide an experience that makes your wallet happy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#111111] border border-white/10 rounded-3xl p-6 text-center hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex justify-center mb-3">
                <stat.icon size={32} className="text-lime-400 group-hover:scale-110 transition" />
              </div>
              <p className="text-3xl md:text-4xl font-bold text-lime-400">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-lime-400 font-semibold tracking-wider uppercase text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
              From a vision to 
              <span className="text-lime-400 block">a reality</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-4">
              Founded in 2024, SkyMart started with a simple idea: make premium 
              shopping accessible, affordable, and enjoyable for everyone.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Today, we serve thousands of happy customers with a curated selection 
              of products across electronics, fashion, home, and more. Our commitment 
              to quality and customer satisfaction has made us a trusted name in 
              online shopping.
            </p>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex -space-x-2">
                {['#84cc16', '#22d3ee', '#f472b6', '#a78bfa'].map((color, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#0a0a0a]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">Join 50K+ happy customers</span>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-lime-400/20 to-transparent border border-white/10 p-8">
              <div className="w-full h-full bg-[#1a1a1a] rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-lime-400/20 flex items-center justify-center mx-auto mb-4">
                    <Zap size={48} className="text-lime-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">SkyMart</p>
                  <p className="text-gray-400">Since 2024</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-lime-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-400/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-lime-400 font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Built for <span className="text-lime-400">excellence</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            We combine cutting-edge technology with human-centric design to create 
            the ultimate shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group bg-gradient-to-br ${feature.color} border border-white/10 rounded-3xl p-8 hover:border-lime-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-400/5`}
            >
              <div className="w-14 h-14 rounded-2xl bg-lime-400/10 flex items-center justify-center mb-5 group-hover:bg-lime-400/20 transition group-hover:scale-110">
                <feature.icon className="text-lime-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== OUR VALUES ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-lime-400/5 to-transparent border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <span className="text-lime-400 font-semibold tracking-wider uppercase text-sm">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              What drives <span className="text-lime-400">us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 text-center hover:border-lime-400/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-lime-400/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-lime-400/20 transition group-hover:scale-110">
                  <value.icon className="text-lime-400" size={24} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-lime-400 font-semibold tracking-wider uppercase text-sm">Meet The Team</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            The people behind <span className="text-lime-400">SkyMart</span>
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            A passionate team dedicated to delivering the best shopping experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-[#111111] border border-white/10 rounded-3xl p-6 text-center hover:border-lime-400/50 transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white group-hover:scale-110 transition`}>
                {member.avatar}
              </div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-gray-400 text-sm">{member.role}</p>
              <div className="flex justify-center gap-3 mt-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime-400/20 transition cursor-pointer">
                  <span className="text-xs">🐦</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-lime-400/20 transition cursor-pointer">
                  <span className="text-xs">🔗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden bg-gradient-to-r from-lime-400/20 to-lime-500/5 border border-lime-400/30 rounded-3xl p-8 md:p-16 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 blur-[100px] rounded-full group-hover:scale-150 transition duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/5 blur-[100px] rounded-full group-hover:scale-150 transition duration-1000"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to <span className="text-lime-400">experience</span> the future of shopping?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers and discover the SkyMart difference today.
            </p>
            <button className="bg-lime-400 hover:bg-lime-300 text-black px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-3 shadow-lg shadow-lime-400/20 hover:shadow-lime-400/40">
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

export default About;