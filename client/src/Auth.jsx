import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      return alert("Saari fields bharna zaroori hai bhai!");
    }

    setLoading(true);
    const endpoint = isLogin ? 'login' : 'register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(`http://localhost:8000/api/auth/${endpoint}`, payload);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      alert(response.data.message || "Mazza aa gaya! Success!");
      setPage('home');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Details check karo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full border border-gray-100 rounded-2xl p-8 shadow-md flex flex-col gap-6 bg-white">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl font-serif font-medium text-black">
            {isLogin ? "Welcome back." : "Join MediumClone."}
          </h2>
          <p className="text-sm text-gray-500">
            {isLogin ? "Apne account me sign in kijiye." : "Naya account banakar blogging shuru karein."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">Full Name</label>
              <input 
                type="text" 
                placeholder="Ujjwal Mishra" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black transition-all bg-gray-50"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">Email Address</label>
            <input 
              type="email" 
              placeholder="ujjwal@test.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black transition-all bg-gray-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-black transition-all bg-gray-50"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-full text-sm transition-all mt-2 shadow-sm disabled:bg-gray-300"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 pt-2 border-t border-gray-100">
          {isLogin ? "No account? " : "Already have an account? "}
          <span 
            onClick={() => { setIsLogin(!isLogin); setName(''); setEmail(''); setPassword(''); }} 
            className="text-green-700 font-medium hover:underline cursor-pointer"
          >
            {isLogin ? "Create one" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Auth;