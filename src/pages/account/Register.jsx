import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/icons/basobasmitra2.png"; // Adjust path if needed

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          formData
        );
        if (response.data.success) {
          toast.success("User registered successfully!");
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
        }
      } catch (error) {
        const errorMsg =
          error.response?.data?.message || "Something went wrong!";
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5">
      {/* Animated Bubbles - more and smaller */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-8 left-8 w-16 h-16 bg-[#14A3C7]/50 rounded-full blur-md animate-bubble-diag"></div>
        <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-blue-400/40 rounded-full blur-md animate-bubble-scale"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-green-400/40 rounded-full blur-md animate-bubble-diag-reverse"></div>
        <div className="absolute bottom-16 right-12 w-20 h-20 bg-[#14A3C7]/40 rounded-full blur-md animate-bubble-scale-reverse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-blue-400/30 rounded-full blur-md animate-bubble-diag"></div>
        <div className="absolute bottom-24 left-1/2 w-28 h-28 bg-green-400/30 rounded-full blur-md animate-bubble-diag-reverse"></div>
      </div>
      {/* Floating Logo */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
        <img src={logo} alt="Logo" className="h-16 w-16 rounded-full shadow-md border-2 border-white bg-white/80" />
      </div>
      {/* Glassmorphism Card */}
      <div
        className="relative w-full max-w-xl mt-28 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-primary/20 p-12 flex flex-col items-center animate-fade-in
        hover:scale-102 transition-transform duration-300 group z-10"
        style={{ boxShadow: "0 8px 32px 0 rgba(20,163,199,0.08), 0 1.5px 8px 0 rgba(20,163,199,0.06)" }}
      >
        {/* Tabs */}
        <div className="flex w-full mb-8 z-10">
          <Link
            to="/login"
            className="flex-1 py-3 rounded-t-xl text-xl font-semibold transition bg-gray-100 text-gray-700 text-center hover:bg-primary/10"
            style={{ borderTopRightRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Login
          </Link>
          <button
            className="flex-1 py-3 rounded-t-xl text-xl font-semibold transition bg-primary text-white shadow"
            style={{ borderTopLeftRadius: 0, borderBottomRightRadius: 0 }}
            disabled
          >
            Signup
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-7 z-10">
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl">
              <FaUser />
            </span>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-14 pr-4 py-4 border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-gray-700 text-lg bg-white/90 shadow-inner transition"
              autoComplete="name"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl">
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-14 pr-4 py-4 border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-gray-700 text-lg bg-white/90 shadow-inner transition"
              autoComplete="email"
              required
            />
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-14 pr-12 py-4 border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-gray-700 text-lg bg-white/90 shadow-inner transition"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary text-xl">
              <FaLock />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Re-type password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-14 pr-12 py-4 border border-primary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-gray-700 text-lg bg-white/90 shadow-inner transition"
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 text-xl shadow-md transition"
          >
            Create Account
          </button>
        </form>
        <div className="w-full flex justify-end mt-4 z-10">
          <p className="text-gray-600 text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Login</Link>
          </p>
        </div>
      </div>
      {/* Animation keyframes */}
      <style>{`
        .animate-fade-in {
          animation: fadeInUp 0.8s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.97);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .animate-bubble-diag {
          animation: bubbleDiag 1.2s ease-in-out infinite alternate;
        }
        .animate-bubble-diag-reverse {
          animation: bubbleDiagReverse 1.7s ease-in-out infinite alternate;
        }
        .animate-bubble-scale {
          animation: bubbleScale 1.5s ease-in-out infinite alternate;
        }
        .animate-bubble-scale-reverse {
          animation: bubbleScaleReverse 2s ease-in-out infinite alternate;
        }
        @keyframes bubbleDiag {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, 20px) scale(1.12); }
        }
        @keyframes bubbleDiagReverse {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-18px, 18px) scale(1.08); }
        }
        @keyframes bubbleScale {
          0% { transform: scale(1); }
          100% { transform: scale(1.18); }
        }
        @keyframes bubbleScaleReverse {
          0% { transform: scale(1); }
          100% { transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};

export default Register;