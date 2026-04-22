import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

// --- ROLE-BASED DASHBOARDS (MODERNIZED) ---

const AdminDashboard = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-mono">
    <div className="bg-slate-900 p-10 border border-red-500/30 rounded-[2.5rem] w-full max-w-md shadow-2xl text-center backdrop-blur-xl">
      <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6 border border-red-500/20">
        <span className="text-2xl font-black">!</span>
      </div>
      <h2 className="text-2xl font-black text-red-500 mb-2 tracking-tighter uppercase italic">Admin_Root</h2>
      <p className="text-slate-500 mb-8 text-xs font-medium uppercase tracking-widest">System Architecture Control</p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-red-600 hover:bg-red-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-red-600/20">Terminate_Session</button>
    </div>
  </div>
);

const StaffDashboard = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-mono">
    <div className="bg-slate-900 p-10 border border-blue-500/30 rounded-[2.5rem] w-full max-w-md shadow-2xl text-center backdrop-blur-xl">
      <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mx-auto mb-6 border border-blue-500/20">
        <span className="text-2xl font-black">#</span>
      </div>
      <h2 className="text-2xl font-black text-blue-500 mb-2 tracking-tighter uppercase italic">Staff_Terminal</h2>
      <p className="text-slate-500 mb-8 text-xs font-medium uppercase tracking-widest">Content Moderation Active</p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-blue-600/20">Logout</button>
    </div>
  </div>
);

// --- MAIN APPLICATION ---

function App() {
  const { user, profile, loading: authLoading } = useAuth();
  
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('browse'); 
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [review, setReview] = useState('');
  const [movieReviews, setMovieReviews] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Handlers (Keeping your logic)
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message); else alert('Account created. Please proceed to login.');
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const fetchMovies = async (query = '') => {
    if (!API_KEY) return;
    setLoading(true);
    const endpoint = query 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Fetch failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    const { data, error } = await supabase.from('watchlists').select('*');
    if (!error) setWatchlist(data || []);
  };

  const fetchReviews = async (movieId) => {
    const { data } = await supabase.from('reviews').select('*').eq('movie_id', movieId).order('created_at', { ascending: false });
    setMovieReviews(data || []);
  };

  const addToWatchlist = async (movie) => {
    const { error } = await supabase.from('watchlists').insert([{ 
      movie_id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average 
    }]);
    if (!error) fetchWatchlist();
  };

  const removeFromWatchlist = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) fetchWatchlist();
  };

  const submitReview = async (movieId) => {
    if (!review) return;
    const { error } = await supabase.from('reviews').insert([
      { movie_id: movieId, content: review, rating: 5, user_id: user.id }
    ]);
    if (!error) { setReview(''); fetchReviews(movieId); }
  };

  useEffect(() => {
    if (user && view === 'browse') fetchMovies(searchQuery);
  }, [user, view, searchQuery]);

  useEffect(() => { if (user) fetchWatchlist(); }, [user]);
  useEffect(() => { if (selectedMovie) fetchReviews(selectedMovie.id); }, [selectedMovie]);

  if (authLoading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  // --- LOGIN / SIGNUP INTERFACE ---
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-800 w-full max-w-md shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase mb-2">Auth_Gate</h2>
            <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Beyza Öztaşkın // Milestone 1</p>
          </div>
          
          <div className="space-y-4">
            <input type="email" placeholder="EMAIL_ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl text-white focus:border-blue-500 outline-none text-xs transition-all" />
            <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700/50 p-4 rounded-2xl text-white focus:border-blue-500 outline-none text-xs transition-all" />
            
            <div className="flex gap-3 pt-4">
              <button onClick={handleLogin} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all">Login</button>
              <button onClick={handleSignUp} className="flex-1 border border-slate-700 hover:bg-slate-800 text-slate-400 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all">Signup</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RBAC REDIRECTS ---
  if (profile?.role === 'Admin') return <AdminDashboard />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  // --- MAIN STANDARD UI ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header / Navbar */}
      <nav className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 uppercase italic">Movie Explorer</h1>
            <div className="flex gap-4 mt-1 uppercase font-bold text-[9px] tracking-widest text-slate-500">
              <button onClick={() => setView('browse')} className={view === 'browse' ? 'text-blue-400' : 'hover:text-slate-300 transition-colors'}>Discovery</button>
              <button onClick={() => setView('watchlist')} className={view === 'watchlist' ? 'text-blue-400' : 'hover:text-slate-300 transition-colors'}>Watchlist ({watchlist.length})</button>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {view === 'browse' && (
              <input type="text" placeholder="Search database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="hidden md:block w-64 bg-slate-900 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none text-xs font-medium transition-all" />
            )}
            <button onClick={() => supabase.auth.signOut()} className="text-[10px] font-black uppercase text-red-500 hover:text-red-400 transition-colors tracking-widest bg-red-500/5 px-4 py-2 rounded-lg border border-red-500/10">Exit_Session</button>
          </div>
        </div>
      </nav>

      {/* Movie Grid */}
      <main className="max-w-7xl mx-auto px-6 mt-12 pb-20">
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2 block">System_Online</span>
          <h2 className="text-4xl font-bold tracking-tight">{view === 'browse' ? 'Trending Discovery' : 'Personal Library'}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {(view === 'browse' ? movies : watchlist).map((movie) => (
            <div key={movie.id} className="group relative bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-xl">
               <div className="aspect-[2/3] overflow-hidden relative">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 cursor-pointer scale-105 group-hover:scale-100" 
                  onClick={() => setSelectedMovie(movie)} 
                />
                
                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {view === 'browse' ? (
                    <button onClick={() => addToWatchlist(movie)} className="bg-blue-600 text-white p-2 rounded-xl text-[9px] font-bold uppercase shadow-lg">+ Add</button>
                  ) : (
                    <button onClick={() => removeFromWatchlist(movie.id)} className="bg-red-600 text-white p-2 rounded-xl text-[9px] font-bold uppercase shadow-lg">- Drop</button>
                  )}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[12px] font-bold truncate uppercase tracking-tight mb-1">{movie.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-slate-500 text-[10px] font-bold">Rating: {movie.vote_average}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal / Detail View (Modernized) */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center p-4 z-50 backdrop-blur-xl" onClick={() => setSelectedMovie(null)}>
          <div className="bg-slate-900 border border-slate-800 max-w-5xl w-full flex flex-col md:flex-row rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.1)]" onClick={e => e.stopPropagation()}>
            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} className="w-full md:w-[400px] object-cover" alt="poster" />
            <div className="p-10 flex flex-col justify-between w-full overflow-y-auto max-h-[90vh]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                   <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest italic">Movie_Profile</span>
                </div>
                <h2 className="text-4xl font-black mb-6 uppercase italic tracking-tighter text-white leading-none">{selectedMovie.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium italic opacity-80">{selectedMovie.overview}</p>
                
                <div className="border-t border-slate-800 pt-8">
                  <h4 className="text-[11px] font-black text-blue-500 mb-6 uppercase tracking-[0.3em]">System_Reviews</h4>
                  <div className="space-y-4 mb-10">
                    {movieReviews.length === 0 ? <p className="text-slate-600 text-[10px] font-bold italic uppercase tracking-widest">// No data entries found.</p> : 
                      movieReviews.map((rev) => (
                        <div key={rev.id} className="bg-slate-800/30 p-5 rounded-2xl border-l-4 border-blue-600">
                          <p className="text-slate-300 text-[11px] font-medium leading-relaxed">{rev.content}</p>
                        </div>
                      ))}
                  </div>
                  
                  <div className="space-y-4">
                    <textarea 
                      value={review} 
                      onChange={(e) => setReview(e.target.value)} 
                      placeholder="Add system review..." 
                      className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-xs focus:border-blue-500 outline-none h-24 transition-all text-slate-300 placeholder:text-slate-700" 
                    />
                    <button onClick={() => submitReview(selectedMovie.id)} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95">Post_Data</button>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedMovie(null)} className="mt-12 text-slate-600 text-[10px] font-black hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                <span className="text-lg">×</span> Terminate_Interface
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;