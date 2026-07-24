// src/components/Footer.jsx
import React from "react";
import {
  Zap,
  Mail,
  Phone,
  MapPin,
  Loader2, // Add this
} from "lucide-react";
import {
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { NavLink } from "react-router";
import { useLocation } from '../hooks/useLocation'; // ✅ Import hook

const Footer = () => {
  // ✅ Use the hook
  const { city, state, country, loading, error, refreshLocation } = useLocation();

  // Create location text
  const locationText = [city, state, country].filter(Boolean).join(', ');

  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-lime-400 flex items-center justify-center">
                <Zap size={20} className="text-black fill-black" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Sky<span className="text-lime-400">Mart</span>
              </h2>
            </div>
            <p className="text-gray-400 leading-7">
              SkyMart is your one-stop destination for premium shopping.
              Discover quality products at the best prices with fast and secure
              delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to='/home' className="text-gray-400 hover:text-lime-400 transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/about' className="text-gray-400 hover:text-lime-400 transition">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to='/products' className="text-gray-400 hover:text-lime-400 transition">
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact - WITH LIVE LOCATION */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-lime-400" size={18} />
                <span className="text-gray-400">support@skymart.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-lime-400" size={18} />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>

              {/* ✅ Live Location - Updated */}
              <div className="flex items-start gap-3">
                <MapPin className="text-lime-400 mt-1" size={18} />
                <div className="flex-1">
                  {loading ? (
                    <span className="text-gray-400 flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      Detecting location...
                    </span>
                  ) : error ? (
                    <span className="text-red-400 text-sm">{error}</span>
                  ) : (
                    <span className="text-gray-400">
                      {locationText || 'Location not available'}
                    </span>
                  )}
                  {!loading && !error && locationText && (
                    <button 
                      onClick={refreshLocation}
                      className="text-xs text-lime-400 hover:underline block mt-1"
                    >
                      Refresh location
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center text-white hover:bg-lime-400 hover:text-black transition duration-300"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center text-white hover:bg-lime-400 hover:text-black transition duration-300"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center text-white hover:bg-lime-400 hover:text-black transition duration-300"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-xl bg-[#171717] border border-white/10 flex items-center justify-center text-white hover:bg-lime-400 hover:text-black transition duration-300"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SkyMart. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-lime-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-lime-400 transition">
              Terms & Conditions
            </a>
            <a href="#" className="text-gray-500 hover:text-lime-400 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;