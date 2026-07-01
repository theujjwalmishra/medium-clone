import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://medium-clone-five-alpha.vercel.app';

function ArticleView({ article, setPage }) {
  // Maintaining local state so numbers change instantly on click
  const [currentArticle, setCurrentArticle] = useState(article);
  const [commentText, setCommentText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch fresh values from database when page opens
  useEffect(() => {
    const fetchFreshArticleData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/articles/${article._id}`);
        setCurrentArticle(res.data);
      } catch (err) {
        console.error("Error refreshing article metrics:", err);
      }
    };
    if (article?._id) {
      fetchFreshArticleData();
    }
  }, [article]);

  // Handle Like Increment
  const handleLike = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/articles/${currentArticle._id}/like`);
      // Fallback handlers to safely read both arrays or direct numbers
      setCurrentArticle(prev => ({
        ...prev,
        likes: Array.isArray(res.data.likes) ? res.data.likes : (prev.likes || 0) + 1
      }));
    } catch (err) {
      console.error("Failed to process like action:", err);
    }
  };

  // Handle Comment Submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsProcessing(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/articles/${currentArticle._id}/comment`, {
        text: commentText,
        author: "Anonymous Writer" // Default fallback author
      });
      
      setCurrentArticle(res.data);
      setCommentText('');
    } catch (err) {
      console.error("Failed to submit comment response:", err);
      alert("Could not post comment. Please check connection.");
    }
    setIsProcessing(false);
  };

  // Safe checks to evaluate data length regardless of database design schema
  const likesCount = Array.isArray(currentArticle?.likes) 
    ? currentArticle.likes.length 
    : (currentArticle?.likes || 0);

  const commentsList = Array.isArray(currentArticle?.comments) 
    ? currentArticle.comments 
    : [];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 antialiased text-gray-900">
      
      {/* NAVIGATION BACK HOOK */}
      <button 
        onClick={() => setPage('home')} 
        className="text-sm text-gray-500 hover:text-black transition-colors mb-8 flex items-center gap-2 font-medium"
      >
        ← Back to Feed
      </button>

      {/* AUTHOR INFRASTRUCTURE METADATA */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1a8917] to-emerald-700 rounded-full text-white flex items-center justify-center font-bold uppercase text-sm">
          {currentArticle?.author?.name ? currentArticle.author.name[0] : 'A'}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-800">{currentArticle?.author?.name || "Anonymous Writer"}</h4>
          <p className="text-xs text-gray-400">Published in {currentArticle?.category || "Lifestyle"}</p>
        </div>
      </div>

      {/* CORE TITLE & TEXT CONTENT */}
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-black tracking-tight leading-tight mb-8">
        {currentArticle?.title}
      </h1>

      <div className="text-lg md:text-xl font-serif text-gray-800 leading-relaxed tracking-normal whitespace-pre-line mb-12">
        {currentArticle?.content}
      </div>

      {/* METRICS DISPLAYER ROW */}
      <div className="flex items-center gap-6 border-t border-b border-gray-100 py-3 mb-10 text-sm text-gray-500 select-none">
        <button onClick={handleLike} className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer group">
          <span className="group-hover:scale-110 transition-transform">❤️</span> 
          <span className="font-medium text-gray-700">{likesCount}</span> Likes
        </button>
        <div className="flex items-center gap-1.5">
          <span>💬</span> 
          <span className="font-medium text-gray-700">{commentsList.length}</span> Comments
        </div>
      </div>

      {/* RESPONSES ENGINE AREA */}
      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-bold text-black font-serif">Responses ({commentsList.length})</h3>
        
        <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
          <textarea
            placeholder="What are your thoughts?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="4"
            className="w-full border border-gray-200 bg-gray-50/50 p-4 rounded-xl text-sm outline-none focus:bg-white focus:border-black transition-all resize-none shadow-inner"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="bg-black text-white px-5 py-2 rounded-full text-xs font-semibold w-fit hover:bg-gray-800 transition-all shadow-sm disabled:bg-gray-400"
          >
            {isProcessing ? "Processing..." : "Respond"}
          </button>
        </form>

        {/* RENDERING RECENT COMMENT LIST */}
        <div className="flex flex-col gap-4 mt-6">
          {commentsList.map((c, i) => (
            <div key={c._id || i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm flex flex-col gap-1">
              <span className="font-semibold text-gray-700">{c.author || "Anonymous Writer"}</span>
              <p className="text-gray-600 font-serif">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default ArticleView;