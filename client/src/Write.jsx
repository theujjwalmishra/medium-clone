import React, { useState } from 'react';
import axios from 'react';

const API_BASE_URL = 'http://localhost:8000';

function Write({ setPage }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Programming');
  const [loading, setLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Title aur Content likhna zaroori hai bhaiya!");

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/articles`, {
        title,
        content,
        category,
        authorId: "65f1bc479b1d4c23a8b45678", 
        status: "Published"
      });
      alert("Wow! Blog article live ho gaya! 🎉");
      setPage('home');
    } catch (err) {
      console.error(err);
      alert("Save karne me kuch gaddbad hui.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <div className="max-w-4xl mx-auto px-6 pt-8 flex justify-between items-center">
        <button 
          onClick={() => setPage('home')} 
          className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-2 font-medium"
        >
          ← Back to Feed
        </button>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 font-medium">Draft in Ujjwal Mishra</span>
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="bg-[#1a8917] hover:bg-[#156d12] text-white font-medium px-4 py-1.5 rounded-full text-xs transition-all disabled:bg-gray-200 disabled:text-gray-400"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-4 mb-6">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Select Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-fit bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-all"
          >
            <option value="Programming">Programming 💻</option>
            <option value="Technology">Technology 🚀</option>
            <option value="Lifestyle">Lifestyle 🌿</option>
          </select>
        </div>

        <div className="flex flex-col gap-6">
          <input 
            type="text" 
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-4xl md:text-5xl font-serif font-medium outline-none border-none placeholder-gray-300 text-black w-full tracking-tight leading-tight"
          />
          <div className="h-[1px] w-full bg-gray-100 my-2"></div>
          <textarea 
            placeholder="Tell your story..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="15"
            className="text-xl font-serif outline-none border-none placeholder-gray-300 text-gray-800 w-full resize-none leading-relaxed focus:placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

export default Write;