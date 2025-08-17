import React, { useState } from "react";
import { User, Mail, Lock, Shield, Building2, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  // Mock navigation function for demo
  const navigate = useNavigate();

  const [step, setStep] = useState("register"); // register | verify | login
  const [form, setForm] = useState({ username: "", email: "", password: "", otp: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (step === "register") {
      if (!form.username.trim()) return "Full name is required";
      if (!form.email.trim()) return "Email is required";
      if (!form.password.trim()) return "Password is required";
      if (form.password.length < 6) return "Password must be at least 6 characters";
      if (!/\S+@\S+\.\S+/.test(form.email)) return "Please enter a valid email";
    } else if (step === "verify") {
      if (!form.email.trim()) return "Email is required";
      if (!form.otp.trim()) return "OTP is required";
      if (form.otp.length !== 6) return "OTP must be 6 digits";
    } else if (step === "login") {
      if (!form.email.trim()) return "Email is required";
      if (!form.password.trim()) return "Password is required";
    }
    return "";
  };

  // REGISTER
  const registerUser = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://demo-reg.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Registration successful! Please check your email for OTP.");
        setTimeout(() => {
          setStep("verify");
          setSuccess("");
        }, 1500);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const verifyUser = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://demo-reg.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          otp: form.otp.trim()
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess("Email verified successfully! You can now login.");
        setTimeout(() => {
          setStep("login");
          setSuccess("");
        }, 1500);
      } else {
        setError(data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // LOGIN  
  const loginUser = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://demo-reg.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password
        }),
      });
      const data = await res.json();

      if (res.ok) {
        const { token } = data; // get token from API response
        localStorage.setItem("token", token);
        navigate("/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (step === "register") registerUser();
      else if (step === "verify") verifyUser();
      else if (step === "login") loginUser();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-orange-50 to-green-50 px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Jan Seva Kendra
          </h1>
          <p className="text-sm text-gray-600 mt-2">जन सेवा केंद्र - Public Service Portal</p>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-green-700">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{success}</span>
          </div>
        )}

        {/* Register Form */}
        {step === "register" && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Create Account
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Full Name"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  value={form.username}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  value={form.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  value={form.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={registerUser}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?
              <button
                onClick={() => setStep("login")}
                className="text-blue-600 font-medium ml-1 hover:underline"
                disabled={loading}
              >
                Sign In
              </button>
            </p>
          </div>
        )}

        {/* Verify OTP Form */}
        {step === "verify" && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Verify Email
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  value={form.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-center text-lg tracking-widest"
                  value={form.otp}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  maxLength="6"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={verifyUser}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Didn't receive OTP?
              <button
                onClick={() => setStep("register")}
                className="text-green-600 font-medium ml-1 hover:underline"
                disabled={loading}
              >
                Resend
              </button>
            </p>
          </div>
        )}

        {/* Login Form */}
        {step === "login" && (
          <div>
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              Sign In
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.email}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  value={form.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={loginUser}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Need an account?
              <button
                onClick={() => setStep("register")}
                className="text-purple-600 font-medium ml-1 hover:underline"
                disabled={loading}
              >
                Create Account
              </button>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500">
            Secure • Trusted • Government Initiative
          </p>
        </div>
      </div>
    </div>
  );
}