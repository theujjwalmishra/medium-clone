import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Write from './Write';
import ArticleView from './ArticleView';
import Auth from './Auth';

const API_BASE_URL = 'https://medium-clone-five-alpha.vercel.app';

function App() {
  const [page, setPage] = useState('home');
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/articles`);
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dynamic feed data:", err);
        setLoading(false);
      }
    };
    fetchArticles();
  }, [page]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
      
      {/* GLOBAL NAVBAR */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
            <span className="text-2xl font-black tracking-tight text-black font-serif">
              Medium<span className="text-[#1a8917]">Clone</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span onClick={() => setPage('home')} className="text-sm text-gray-500 hover:text-black cursor-pointer hidden md:inline transition-colors">Our story</span>
            <span onClick={() => setPage('write')} className="text-sm text-gray-500 hover:text-black cursor-pointer font-medium flex items-center gap-1.5 transition-colors">
              ✏️ Write
            </span>
            <span onClick={() => setPage('auth')} className="text-sm text-gray-500 hover:text-black cursor-pointer transition-colors">Sign in</span>
            <button onClick={() => setPage('auth')} className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-sm">
              Get started
            </button>
          </div>

        </div>
      </nav>

      {/* DYNAMIC ROUTING CONFIGURATION */}
      {page === 'write' ? (
        <Write setPage={setPage} />
      ) : page === 'view' ? (
        <ArticleView article={selectedArticle} setPage={setPage} />
      ) : page === 'auth' ? (
        <Auth setPage={setPage} />
      ) : (
        <>
          {/* HERO BANNER SECTION */}
          <header className="bg-[#FFC017] border-b border-black py-24 flex items-center">
            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div className="flex flex-col gap-6">
                <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-none text-black">
                  Stay curious.
                </h1>
                <p className="text-xl md:text-2xl max-w-md text-gray-900 font-serif leading-relaxed">
                  Discover stories, thinking, and expertise from writers on any topic.
                </p>
                <button onClick={() => setPage('auth')} className="bg-black text-white w-fit px-8 py-3 rounded-full text-base font-medium hover:bg-gray-900 transition-all mt-4 shadow-sm">
                  Start reading
                </button>
              </div>
              <div className="hidden md:flex justify-center text-[12rem] font-serif select-none text-black/10 font-bold">
                M
              </div>
            </div>
          </header>

          {/* ARTICLES FEED */}
          <main className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-10">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
                Trending on MediumClone
              </span>
            </div>
            
            {loading ? (
              <div className="text-center py-12 text-sm font-medium text-gray-400 animate-pulse">Fetching latest stories from database... ⏳</div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 text-sm font-medium text-gray-400">
                No stories published yet. Be the first to share your story! 📝
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <div 
                    key={article._id} 
                    onClick={() => { setSelectedArticle(article); setPage('view'); }}
                    className="flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#1a8917] to-emerald-700 rounded-full text-white flex items-center justify-center text-[10px] font-bold uppercase">
                          {article.author?.name ? article.author.name[0] : 'A'}
                        </div>
                        <span className="text-xs font-semibold text-gray-700">{article.author?.name || "Anonymous Writer"}</span>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-xl font-bold group-hover:text-[#1a8917] text-black transition-colors font-serif leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-serif line-clamp-3 leading-relaxed">
                          {article.content}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100">
                      <span>{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • 5 min read</span>
                      <span className="bg-gray-100 group-hover:bg-green-50 group-hover:text-[#1a8917] text-gray-600 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide transition-colors">
                        {article.category || "General"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

    </div>
  );
}

export default App;