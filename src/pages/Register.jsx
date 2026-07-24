import React, { useContext, useState } from "react";
import {
  Zap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";;
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { MyContext } from "../context/SignUpProvider";
import { toast } from "sonner";
import { formValidation } from "../utils/validation";

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useContext(MyContext);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch('password', "")

  const formSubmit = (data) => {
    formValidation({
      data,
      user,
      setUser,
      reset,
      navigate
    });
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4">

      <div className="w-full max-w-lg">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">

          <div className="w-12 h-12 rounded-2xl bg-lime-400 flex items-center justify-center">
            <Zap className="text-black fill-black" />
          </div>

          <h1 className="text-4xl font-bold">
            <span className="text-white">Sky</span>
            <span className="text-lime-400">Mart</span>
          </h1>

        </div>

        {/* Card */}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="bg-[#111111] border border-white/10 rounded-[32px] shadow-2xl p-10">
            <h2 className="text-5xl font-bold text-white">Create account</h2>
            <p className="text-gray-500 text-lg mt-2">Join SkyMart and start shopping</p>

            {/* Full Name */}
            <div className="mt-10">
              <div className="relative">
                <User
                  size={22}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10"
                />
                <input
                  {...register("fullName", {
                    required: 'Full Name is required.'
                  })}
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-[#1d1d1d] border border-white/10 rounded-2xl py-5 pl-14 pr-5 text-white placeholder:text-gray-500 outline-none focus:border-lime-400 transition"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mt-6">
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
                      message: 'Invalid Email'
                    }
                  })}
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-[#1d1d1d] border border-white/10 rounded-2xl py-5 pl-14 pr-5 text-white placeholder:text-gray-500 outline-none focus:border-lime-400 transition"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
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
                  placeholder="Password (min 6 chars)"
                  className="w-full bg-[#1d1d1d] border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-white placeholder:text-gray-500 outline-none focus:border-lime-400 transition"
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
                <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mt-6">
              <div className="relative">
                <Lock
                  size={22}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 z-10"
                />
                <input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full bg-[#1d1d1d] border border-white/10 rounded-2xl py-5 pl-14 pr-14 text-white placeholder:text-gray-500 outline-none focus:border-lime-400 transition"
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Button */}
            <button className="cursor-pointer w-full mt-8 bg-lime-400 hover:bg-lime-300 rounded-2xl py-5 text-black text-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300">
              Create Account
              <ArrowRight size={25} />
            </button>

            {/* Footer */}
            <p className="text-center text-gray-500 mt-8 text-lg">
              Already have an account?{" "}
              <span onClick={() => navigate('/')} className="text-lime-400 font-semibold cursor-pointer hover:underline">
                Sign in
              </span>
            </p>
          </div>
        </form>

      </div>

    </div>
  );
};

export default Register;