import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

// --- ROLE-BASED DASHBOARDS ---

const AdminDashboard = () => (
  <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
    <div className="bg-gray-900 p-8 border border-red-900 w-full max-w-md shadow-2xl text-center">
      <h2 className="text-2xl font-black text-red-500 mb-6 tracking-tighter italic uppercase">Admin_Control // System_Root</h2>
      <p className="text-gray-400 mb-8 text-xs font-light">Management interface for administrative operations and system monitoring.</p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-red-600 hover:bg-red-500 p-3 font-bold uppercase tracking-widest text-[10px]">Terminate_Session</button>
    </div>
  </div>
);

const StaffDashboard = () => (
  <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
    <div className="bg-gray-900 p-8 border border-blue-900 w-full max-w-md shadow-2xl text-center">
      <h2 className="text-2xl font-black text-blue-500 mb-6 tracking-tighter italic uppercase">Staff_Terminal // Authorized</h2>
      <p className="text-gray-400 mb-8 text-xs font-light">Standard operational dashboard for content moderation and review oversight.</p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-blue-600 hover:bg-blue-500 p-3 font-bold uppercase tracking-widest text-[10px]">Logout</button>
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

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message); else alert('Account created. Please proceed to login.');
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const fetchMovies = async (query = '') => {
    console.log("DEBUG: Initializing movie fetch...");
    
    if (!API_KEY) {
      console.error("DEBUG_ERROR: VITE_TMDB_API_KEY is missing in environment variables.");
      return;
    }

    setLoading(true);
    const endpoint = query 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      
      const data = await response.json();
      console.log("DEBUG: API Data retrieved:", data);
      setMovies(data.results || []);
    } catch (error) {
      console.error("DEBUG_ERROR: Fetch failed:", error.message);
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

  // Logic: Decoupled from profile?.role to ensure movies load regardless of database delays
useEffect(() => {
    if (user && view === 'browse') {
      fetchMovies(searchQuery);
    }
  }, [user, view, searchQuery]);

  useEffect(() => { if (user) fetchWatchlist(); }, [user]);
  useEffect(() => { if (selectedMovie) fetchReviews(selectedMovie.id); }, [selectedMovie]);

  if (authLoading) return <div className="min-h-screen bg-black text-purple-600 flex items-center justify-center font-mono text-[10px] uppercase tracking-widest">System_Boot_Sequence...</div>;

if (!user) {
    return (
      <>
        {/* Debug Line */}
        <div className="bg-yellow-900/20 border border-yellow-600 p-2 font-mono text-[10px] text-yellow-500">
          DEBUG: User: {user ? "OK" : "NULL"} | Profile: {profile ? profile.role : "NULL"} | Movies: {movies.length}
        </div>

        {/* Login Screen */}
        <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
          <div className="bg-gray-900 p-8 border border-purple-900 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-black text-purple-500 mb-6 tracking-tighter italic uppercase">Terminal // Auth_Gate</h2>
            <input type="email" placeholder="EMAIL_ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-gray-800 p-3 mb-4 text-white focus:border-purple-500 outline-none text-xs" />
            <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-gray-800 p-3 mb-6 text-white focus:border-purple-500 outline-none text-xs" />
            <div className="flex gap-4">
              <button onClick={handleLogin} className="flex-1 bg-purple-700 hover:bg-purple-600 p-3 font-bold text-[10px] uppercase tracking-widest">Login</button>
              <button onClick={handleSignUp} className="flex-1 border border-purple-700 hover:bg-purple-900/30 p-3 font-bold text-purple-500 text-[10px] uppercase tracking-widest">Signup</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // --- PROGRAMMATIC REDIRECTS ---
  if (profile?.role === 'Admin') return <AdminDashboard />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  // --- STANDARD USER INTERFACE ---
  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <header className="mb-12 border-b border-purple-900/40 pb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-600 uppercase italic">Movie Explorer</h1>
          <nav className="flex gap-4 mt-4 uppercase font-mono text-[9px] tracking-widest">
            <button onClick={() => setView('browse')} className={view === 'browse' ? 'text-purple-400 border-b border-purple-400' : 'text-gray-500'}>[ Browse ]</button>
            <button onClick={() => setView('watchlist')} className={view === 'watchlist' ? 'text-purple-400 border-b border-purple-400' : 'text-gray-500'}>[ Watchlist ({watchlist.length}) ]</button>
            <button onClick={() => supabase.auth.signOut()} className="text-red-600 ml-4 hover:text-red-500">[ Logout ]</button>
          </nav>
        </div>
        {view === 'browse' && (
          <input type="text" placeholder="Search database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-80 bg-gray-900 border border-gray-800 p-4 focus:border-purple-500 outline-none font-mono text-xs" />
        )}
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {(view === 'browse' ? movies : watchlist).map((movie) => (
          <div key={movie.id} className="group relative bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all">
             <div className="aspect-[2/3] overflow-hidden relative">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all cursor-pointer" onClick={() => setSelectedMovie(movie)} />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {view === 'browse' ? (
                  <button onClick={() => addToWatchlist(movie)} className="bg-purple-700 p-2 text-[9px] font-bold uppercase">Add +</button>
                ) : (
                  <button onClick={() => removeFromWatchlist(movie.id)} className="bg-red-700 p-2 text-[9px] font-bold uppercase">Drop -</button>
                )}
              </div>
            </div>
            <div className="p-3 bg-gray-900/50">
              <h3 className="text-[11px] font-bold truncate uppercase">{movie.title}</h3>
              <p className="text-purple-500 text-[9px] font-mono mt-1">VOTE_AVG: {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 backdrop-blur-md" onClick={() => setSelectedMovie(null)}>
          <div className="bg-gray-900 border border-purple-500/50 max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} className="w-full md:w-80 object-cover" alt="poster" />
            <div className="p-8 flex flex-col justify-between w-full overflow-y-auto max-h-[85vh]">
              <div>
                <h2 className="text-2xl font-black mb-4 uppercase italic tracking-tighter">{selectedMovie.title}</h2>
                <p className="text-gray-400 text-xs leading-relaxed mb-8 font-light italic">{selectedMovie.overview}</p>
                <div className="border-t border-gray-800 pt-6">
                  <h4 className="text-[10px] font-mono text-purple-500 mb-4 uppercase tracking-widest underline">User_Reviews</h4>
                  <div className="space-y-3 mb-8">
                    {movieReviews.length === 0 ? <p className="text-gray-600 text-[10px] font-mono">Status: No review data found for this entry.</p> : 
                      movieReviews.map((rev) => (
                        <div key={rev.id} className="bg-black/40 p-3 border-l-2 border-purple-700">
                          <p className="text-gray-200 text-[10px] font-light leading-snug">{rev.content}</p>
                        </div>
                      ))}
                  </div>
                  <h4 className="text-[10px] font-mono text-purple-500 mb-2 uppercase tracking-widest">Submit_Evaluation</h4>
                  <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Enter content..." className="w-full bg-black border border-gray-800 p-3 text-xs focus:border-purple-500 outline-none h-20 mb-4 font-mono text-gray-300" />
                  <button onClick={() => submitReview(selectedMovie.id)} className="bg-purple-700 hover:bg-purple-600 px-6 py-2 text-[9px] font-bold uppercase tracking-tighter">Execute_Post</button>
                </div>
              </div>
              <button onClick={() => setSelectedMovie(null)} className="mt-8 text-gray-600 text-[9px] font-mono hover:text-white uppercase tracking-widest">Close_Interface [X]</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;