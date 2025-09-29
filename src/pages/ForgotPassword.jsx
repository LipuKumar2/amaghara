import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.otp) {
      newErrors.otp = 'OTP is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateStep1()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://amaghara-server.onrender.com/auth/user/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          purpose: 'reset' // Use 'reset' for password reset
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOtpSent(true);
        setCurrentStep(2);
        setErrors({});
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!validateStep2()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://amaghara-server.onrender.com/auth/user/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          purpose: 'reset'
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOtpVerified(true);
        setCurrentStep(3);
        setErrors({});
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to verify OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!validateStep3()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://amaghara-server.onrender.com/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.password
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Show success message and redirect to login
        setErrors({ success: "Password reset successfully! Redirecting to login..." });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred during password reset. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Based on current step, call the appropriate function
    if (currentStep === 1) {
      await handleSendOtp();
    } else if (currentStep === 2) {
      await handleVerifyOtp();
    } else if (currentStep === 3) {
      await handleResetPassword();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 md:p-12 w-full max-w-md">
        <Link to="/login" className="flex items-center text-gray-600 mb-4 text-sm hover:text-indigo-600">
          <ArrowLeft size={16} className="mr-1" /> Back to Login
        </Link>
        
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your email and follow the steps to reset your password
        </p>

        {/* Progress Steps */}
        <div className="flex justify-between mb-6">
          <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
              1
            </div>
            <span className="text-xs mt-1">Email</span>
          </div>
          <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
              2
            </div>
            <span className="text-xs mt-1">OTP</span>
          </div>
          <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
              3
            </div>
            <span className="text-xs mt-1">Password</span>
          </div>
        </div>

        {errors.submit && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {errors.submit}
          </div>
        )}

        {errors.success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">
            {errors.success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Step 1: Email */}
          {currentStep === 1 && (
            <>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              <p className="text-sm text-gray-500">
                Enter your email address and we'll send you a verification code to reset your password.
              </p>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 2 && (
            <>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-blue-700 text-sm">
                  We've sent a verification code to <strong>{formData.email}</strong>. Please check your inbox.
                </p>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                  required
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
              </div>
              
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-sm text-indigo-600 hover:underline"
              >
                Resend OTP
              </button>
            </>
          )}

          {/* Step 3: New Password */}
          {currentStep === 3 && (
            <>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition"
              >
                Back
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 bg-gradient-to-r from-indigo-600 to-pink-600 text-white py-3 rounded-xl font-bold shadow hover:shadow-lg transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 
                currentStep === 1 ? 'Send OTP' : 
                currentStep === 2 ? 'Verify OTP' : 
                'Reset Password'}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;