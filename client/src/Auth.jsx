import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://medium-clone-five-alpha.vercel.app';

function Auth({ setPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      return alert("Please fill in all the required fields.");
    }

    setLoading(true);
    try {
      if (isLogin) {
        // Login Flow
        const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
        alert("Signed in successfully! Welcome back.");
        setPage('home');
      } else {
        // Registration Flow
        const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
        alert("Account created successfully! Please sign in.");
        setIsLogin(true); // Switches window layout context to login view
      }
    } catch (err) {
      console.error("Authentication action failed:", err);
      const serverMessage = err.response?.data?.message || err.response?.data || "Authentication failed. Please verify your credentials and try again.";
      alert(serverMessage);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-gray-200/80 p-10 rounded-3xl shadow-sm flex flex-col gap-8">
        
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-4xl font-serif tracking-tight text-gray-900 font-medium">
            {isLogin ? "Welcome back." : "Join MediumClone."}
          </h2>
          <p className="text-sm text-gray-500">
            {isLogin ? "Sign in to access your customized feed." : "Create an account to start sharing your stories."}
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 rounded-xl text-sm outline-none focus:bg-white focus:border-black transition-all"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 rounded-xl text-sm outline-none focus:bg-white focus:border-black transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 rounded-xl text-sm outline-none focus:bg-white focus:border-black transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3.5 rounded-full text-sm font-semibold hover:bg-gray-950 transition-all shadow-sm mt-2 disabled:bg-gray-400"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 border-t border-gray-100 pt-6">
          {isLogin ? (
            <p>No account? <span onClick={() => setIsLogin(false)} className="text-[#1a8917] hover:text-green-800 font-medium cursor-pointer transition-colors">Create one</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setIsLogin(true)} className="text-[#1a8917] hover:text-green-800 font-medium cursor-pointer transition-colors">Sign in</span></p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Auth;