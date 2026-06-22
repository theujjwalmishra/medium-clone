import React, { useState } from 'react';
import axios from 'axios';

function ArticleView({ article, setPage }) {
  const [likes, setLikes] = useState(article.likes || 0);
  const [comments, setComments] = useState(article.comments || []);
  const [newComment, setNewComment] = useState('');

  // Like Handle Function
  const handleLike = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/articles/${article._id}/like`);
      setLikes(response.data.likes);
    } catch (err) {
      console.error("Like nahi ho paya", err);
    }
  };

  // Comment Submit Function
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`http://localhost:8000/api/articles/${article._id}/comment`, {
        text: newComment,
        postedBy: "Ujjwal Mishra" // Baad me logged-in user se link karenge
      });
      setComments(response.data);
      setNewComment(''); // Input box clear karo
    } catch (err) {
      console.error("Comment add nahi ho paya", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased py-16">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={() => setPage('home')} 
          className="text-sm text-gray-500 hover:text-black mb-8 transition-colors flex items-center gap-2 font-medium"
        >
          ← Back to Feed
        </button>

        {/* Header */}
        <header className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1a8917] to-emerald-700 rounded-full text-white flex items-center justify-center text-sm font-bold uppercase">
              {article.author?.name ? article.author.name[0] : 'A'}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">{article.author?.name || "Anonymous Writer"}</h4>
              <p className="text-xs text-gray-400">Published in {article.category || "General"}</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-black tracking-tight leading-tight">
            {article.title}
          </h1>
        </header>

        <div className="h-[1px] w-full bg-gray-100 my-8"></div>

        {/* Content */}
        <article className="text-lg md:text-xl font-serif text-gray-800 leading-relaxed whitespace-pre-line mb-12">
          {article.content}
        </article>

        {/* LIKE & COMMENT ZONE */}
        <div className="border-t border-b border-gray-100 my-8 py-4 flex gap-8 text-sm text-gray-500 font-medium">
          <button onClick={handleLike} className="hover:text-red-500 transition-colors flex items-center gap-2 outline-none">
            ❤️ <span className="font-bold text-black">{likes}</span> Likes
          </button>
          <div className="flex items-center gap-2 text-gray-500">
            💬 <span className="font-bold text-black">{comments.length}</span> Comments
          </div>
        </div>

        {/* COMMENT BOX FORM */}
        <div className="mt-8 flex flex-col gap-4">
          <h3 className="text-lg font-bold font-serif">Responses ({comments.length})</h3>
          
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-3">
            <textarea 
              placeholder="What are your thoughts?" 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="3"
              className="w-full p-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-black resize-none bg-gray-50"
            />
            <button 
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-full text-xs w-fit shadow-sm"
            >
              Respond
            </button>
          </form>

          {/* COMMENTS LIST DISPLAY */}
          <div className="flex flex-col gap-4 mt-6">
            {comments.map((c, index) => (
              <div key={index} className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col gap-1.5 shadow-sm">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                  <span>{c.postedBy}</span>
                  <span className="text-[10px] text-gray-400 font-normal">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-gray-800 font-sans">{c.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ArticleView;