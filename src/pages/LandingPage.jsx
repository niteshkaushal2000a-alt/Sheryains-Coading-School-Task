import React, { useContext, useState } from "react";
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { MyAuth } from "../context/AuthProvider";
import { MyContext } from "../context/SignUpProvider";
import { login } from "../utils/validation";

const LandingPage = () => {
  const { setCurrentUser } = useContext(MyAuth);
  const { user } = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange'
  });

  const loginForm = (data) => {
    login({
      data,
      setCurrentUser,
      user,
      reset,
      navigate
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex overflow-hidden">
      {/* LEFT SECTION - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 relative border-r border-white/10 p-24 flex-col justify-between">
        {/* Background Glow */}
        <div className="absolute left-0 bottom-0 w-[550px] h-[550px] bg-lime-400/10 blur-[140px] rounded-full"></div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-lime-400 flex items-center justify-center">
            <Zap className="text-black fill-black" size={28} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-white">Sky</span>
            <span className="text-lime-400">Mart</span>
          </h1>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-xl space-y-8">
          <p className="text-lime-400 font-semibold tracking-[4px] uppercase text-sm">
            Welcome Back
          </p>

          <h1 className="text-7xl font-bold leading-tight text-white">
            Shop the future.
            <br />
            <span className="text-lime-400">Today.</span>
          </h1>

          <p className="text-gray-400 text-xl leading-9">
            Thousands of products, lightning-fast delivery,
            and prices that make your wallet happy.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14">
            <div className="h-32 rounded-3xl border border-white/10 bg-[#121212] flex flex-col items-center justify-center transition-all duration-300 hover:border-lime-400/50 hover:bg-[#1a1a1a]">
              <h2 className="text-4xl font-bold text-lime-400">20K+</h2>
              <p className="text-gray-500 mt-1 text-sm">Products</p>
            </div>

            <div className="h-32 rounded-3xl border border-white/10 bg-[#121212] flex flex-col items-center justify-center transition-all duration-300 hover:border-lime-400/50 hover:bg-[#1a1a1a]">
              <h2 className="text-4xl font-bold text-lime-400">50K+</h2>
              <p className="text-gray-500 mt-1 text-sm">Users</p>
            </div>

            <div className="h-32 rounded-3xl border border-white/10 bg-[#121212] flex flex-col items-center justify-center transition-all duration-300 hover:border-lime-400/50 hover:bg-[#1a1a1a]">
              <h2 className="flex items-center gap-1 text-4xl font-bold text-lime-400">
                4.9
                <Star size={28} fill="currentColor" />
              </h2>
              <p className="text-gray-500 mt-1 text-sm">Rating</p>
            </div>
          </div>
        </div>

        <div></div>
      </div>

      {/* RIGHT SECTION - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <form 
          onSubmit={handleSubmit(loginForm)} 
          className="w-full max-w-xl"
        >
          <div className="bg-[#111111] border border-white/10 rounded-[32px] shadow-2xl p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Sign in
            </h2>
            <p className="text-gray-500 mt-3 text-lg">
              Enter your credentials to continue
            </p>

            {/* Email Field */}
            <div className="mt-10">
              <div className="relative">
                <Mail
                  size={22}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10"
                />
                <input
                  {...register('email', {
                    required: 'Email is required.',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  type="email"
                  placeholder="Email address"
                  className={`w-full bg-[#1d1d1d] border rounded-2xl py-5 pl-14 pr-5 text-white placeholder:text-gray-500 outline-none transition ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-lime-400'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mt-6">
              <div className="relative">
                <Lock
                  size={22}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10"
                />
                <input
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      if (value.length < 6) {
                        return "Password must be at least 6 characters";
                      }
                      if (!/[A-Z]/.test(value)) {
                        return "Password must contain at least one uppercase letter";
                      }
                      if (!/[a-z]/.test(value)) {
                        return "Password must contain at least one lowercase letter";
                      }
                      if (!/\d/.test(value)) {
                        return "Password must contain at least one number";
                      }
                      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                        return "Password must contain at least one special character";
                      }
                      return true;
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full bg-[#1d1d1d] border rounded-2xl py-5 pl-14 pr-14 text-white placeholder:text-gray-500 outline-none transition ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-lime-400'
                  }`}
                />
                
                {showPassword ? (
                  <EyeOff
                    size={20}
                    onClick={() => setShowPassword(false)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white transition z-10"
                  />
                ) : (
                  <Eye
                    size={20}
                    onClick={() => setShowPassword(true)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white transition z-10"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                  <span>⚠️</span>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="cursor-pointer mt-8 w-full bg-lime-400 hover:bg-lime-300 text-black rounded-2xl py-5 text-xl md:text-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Sign in
              <ArrowRight size={26} />
            </button>

            {/* Footer */}
            <p className="text-center mt-8 text-gray-500 text-lg">
              Don't have an account?{" "}
              <span 
                onClick={() => navigate('/signup')} 
                className="text-lime-400 font-semibold cursor-pointer hover:underline transition"
              >
                Create one
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;