import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';
import { fallbackMedia } from './fallbackData';
import MovieCard from './MovieCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Plus, Check, X, Shield, Activity, Database, LogOut, Search, User, LayoutGrid, Bookmark } from 'lucide-react';

// --- ROLE-BASED DASHBOARDS ---

const AdminDashboard = ({ stats, profile }) => (
  <div className="min-h-screen bg-slate-950 p-8 font-mono text-slate-300">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-red-500/20 pb-8">
        <div>
          <h2 className="text-4xl font-black text-red-500 tracking-tighter uppercase italic flex items-center gap-4">
            <Shield size={32} /> Admin_Root_Terminal
          </h2>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] mt-2">Active_Session: {profile?.email}</p>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2">
          <LogOut size={14} /> Terminate_Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total_Users', value: stats.users, icon: <User size={24} /> },
          { label: 'Total_Reviews', value: stats.reviews, icon: <Activity size={24} /> },
          { label: 'Global_Watchlist', value: stats.watchlist, icon: <Database size={24} /> }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-white">
              {item.icon}
            </div>
            <h4 className="text-[10px] font-black text-red-500/50 uppercase tracking-[0.3em] mb-4">{item.label}</h4>
            <div className="text-6xl font-black text-white tracking-tighter">{item.value}</div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 w-1/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 bg-black/40 border border-slate-900 p-6 rounded-3xl">
        <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold animate-pulse">
          System_Log: Fetching_Realtime_Metrics_From_Core... [SUCCESS]
        </p>
      </div>
    </div>
  </div>
);

const StaffDashboard = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-mono">
    <div className="bg-slate-900 p-12 border border-blue-500/30 rounded-[3rem] w-full max-w-lg shadow-2xl text-center backdrop-blur-3xl">
      <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mx-auto mb-8 border border-blue-500/20">
        <Shield size={40} />
      </div>
      <h2 className="text-3xl font-black text-blue-500 mb-2 tracking-tighter uppercase italic">Staff_Terminal</h2>
      <p className="text-slate-500 mb-10 text-xs font-medium uppercase tracking-[0.3em]">Content_Moderation_Active_Protocol</p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all shadow-lg shadow-blue-600/20">
        Logout_System
      </button>
    </div>
  </div>
);

const ProfileView = ({ user, profile, watchlist }) => (
  <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-12 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <span className="text-[12rem] font-black italic">USER</span>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[2.5rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-blue-500/20">
          {profile?.email?.[0].toUpperCase() || 'U'}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic text-white mb-2">
            {profile?.email?.split('@')[0]}
          </h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <span className="bg-blue-500/10 text-blue-500 border border-blue-500/20 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
              Access: {profile?.role || 'User'}
            </span>
            <span className="bg-slate-800 text-slate-400 border border-slate-700 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
              Status: Verified_Unit
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Vault_Capacity', value: watchlist.length, unit: 'Objects' },
        { label: 'Sync_Complete', value: watchlist.filter(i => i.status === 'completed').length, unit: 'Verified' },
        { label: 'Neural_Uptime', value: '99.9%', unit: 'Percent' }
      ].map((stat, idx) => (
        <div key={idx} className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all group">
          <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 group-hover:text-blue-500 transition-colors">{stat.label}</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tracking-tighter">{stat.value}</span>
            <span className="text-[10px] font-bold text-blue-500/50 uppercase">{stat.unit}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- CONSTANTS ---

const genres = [
  { id: 0, name: "All_Data" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-Fi" },
  { id: 10749, name: "Romance" },
];

function App() {
  const { user, profile, loading: authLoading } = useAuth();
  const [mediaList, setMediaList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('browse'); 
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [review, setReview] = useState('');
  const [mediaReviews, setMediaReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [watchlistFilter, setWatchlistFilter] = useState('all');
  const [toast, setToast] = useState({ message: '', type: null });
  const [stats, setStats] = useState({ users: 0, reviews: 0, watchlist: 0 });
  const [page, setPage] = useState(page => 1);
  const [notificationCount, setNotificationCount] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(0);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  };

  const fetchMedia = async (query = '', isNextPage = false) => {
    if (!API_KEY) return;
    setLoading(true);
    const currentPage = isNextPage ? page + 1 : 1;
    
    let endpoint;
    if (query) {
      endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${currentPage}`;
    } else if (selectedGenre !== 0) {
      endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&language=en-US&page=${currentPage}`;
    } else {
      endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;
    }

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setMediaList(isNextPage ? [...mediaList, ...(data.results || [])] : (data.results || []));
      setPage(currentPage);
    } catch (error) {
      if (!isNextPage) setMediaList(fallbackMedia);
      showToast("Data_Stream_Interrupted", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();
      const trailer = data.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) { console.error(error); }
  };

  const fetchWatchlist = async () => {
    const { data, error } = await supabase.from('watchlists').select('*').order('created_at', { ascending: false });
    if (!error) setWatchlist(data || []);
  };

  const fetchReviews = async (mediaId) => {
    if (!mediaId) return;
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('media_id', String(mediaId)) 
      .order('created_at', { ascending: false });
    if (!error) setMediaReviews(data || []);
  };

  const submitReview = async (mediaId) => {
    if (!review || !user) return;
    const { error } = await supabase.from('reviews').insert([{ 
      media_id: String(mediaId), review_text: review, user_rating: rating, user_id: user.id 
    }]);
    if (!error) { 
      setReview(''); 
      await fetchReviews(mediaId); 
      showToast('Data_Injected: Review_Published'); 
    } else {
      showToast(`Error: ${error.message}`, 'error');
    }
  };

  const addToWatchlist = async (mediaItem) => {
    const isDuplicate = watchlist.some(item => String(item.media_id) === String(mediaItem.id));
    if (isDuplicate) {
      showToast('Validation_Error: Already_In_Vault', 'error');
      return;
    }
    const { error } = await supabase.from('watchlists').insert([{ 
      media_id: mediaItem.id, title: mediaItem.title, poster_path: mediaItem.poster_path, 
      vote_average: mediaItem.vote_average, user_id: user?.id, status: 'to_watch'
    }]);
    if (!error) { fetchWatchlist(); showToast(`Object_Synced: Success`); }
  };

  const removeFromWatchlist = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) { fetchWatchlist(); showToast('Object_Deleted', 'error'); }
  };

  const toggleWatchlistStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'to_watch' ? 'completed' : 'to_watch';
    const { error } = await supabase.from('watchlists').update({ status: newStatus }).eq('id', id);
    if (!error) fetchWatchlist();
  };

  const fetchStats = async () => {
    const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: r } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
    const { count: w } = await supabase.from('watchlists').select('*', { count: 'exact', head: true });
    setStats({ users: u || 0, reviews: r || 0, watchlist: w || 0 });
  };

  // --- EFFECTS ---

  useEffect(() => { fetchMedia(searchQuery); }, [searchQuery, selectedGenre]);
  
  useEffect(() => { 
    if (user) { 
      fetchWatchlist(); 
      if (profile?.role === 'Admin') fetchStats(); 
    } 
  }, [user, profile]);

  useEffect(() => { 
    if (selectedMedia) { 
      fetchReviews(selectedMedia.id); 
      fetchTrailer(selectedMedia.id); 
    } 
  }, [selectedMedia]);

  if (authLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

  // USER AVERAGE CALCULATION
  const userAverage = mediaReviews.length > 0 
    ? (mediaReviews.reduce((acc, rev) => acc + rev.user_rating, 0) / mediaReviews.length).toFixed(1)
    : "0.0";

  // --- LOGIN VIEW ---

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute inset-0 z-0 flex gap-4 opacity-10 pointer-events-none skew-y-12 scale-110">
          {[1, 2, 3, 4, 5, 6].map((col) => (
            <div key={col} className="flex-1 flex flex-col gap-4 animate-infinite-scroll">
              {[...mediaList, ...mediaList].slice(0, 20).map((movie, idx) => (
                <img key={idx} src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300'} className="w-full rounded-xl grayscale brightness-50" alt="" />
              ))}
            </div>
          ))}
        </div>
        <div className="relative z-10 bg-slate-900/90 p-12 rounded-[3rem] border border-slate-800/60 w-full max-w-md shadow-2xl backdrop-blur-3xl">
<div className="text-center mb-12">
  <h2 className="text-6xl font-black tracking-tighter italic uppercase mb-2 text-white">
    Nova<span className="text-blue-500">Stream</span>
  </h2>
  <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase">
    Neural_Network_v1.0.4
  </p>
</div>

          <div className="space-y-6">
            <input type="email" placeholder="root@novastream.sys" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-5 rounded-2xl text-white outline-none font-mono text-xs focus:border-blue-500 transition-all" />
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-5 rounded-2xl text-white outline-none font-mono text-xs focus:border-blue-500 transition-all" />
            <button onClick={async () => { const {error} = await supabase.auth.signInWithPassword({email, password}); if(error) showToast("Access_Denied", "error"); }} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[12px] transition-all shadow-lg shadow-blue-600/30">Connect_Unit</button>
            <button onClick={async () => { const {error} = await supabase.auth.signUp({email, password}); if(error) showToast(error.message, "error"); }} className="w-full bg-transparent hover:bg-slate-800 text-slate-500 py-5 rounded-2xl font-bold uppercase border border-slate-800/50 text-[10px] transition-all">Request_New_Identifier</button>
          </div>
        </div>
      </div>
    );
  }

  if (profile?.role === 'Admin') return <AdminDashboard stats={stats} profile={profile} />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="fixed top-28 right-8 z-[200]">
            <div className={`px-8 py-5 rounded-[1.5rem] border backdrop-blur-2xl shadow-2xl flex items-center gap-4 ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
              <div className={`w-2 h-2 rounded-full animate-ping ${toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] font-mono">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Navigation */}
<nav className="p-8 flex justify-between items-center border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
  <h1 className="text-3xl font-black italic tracking-tighter leading-none hover:scale-105 transition-transform cursor-default">
    Nova<span className="text-blue-500">Stream</span>
  </h1>
          <h1 className="text-3xl font-black italic tracking-tighter leading-none hover:scale-105 transition-transform cursor-default">Nova<span className="text-blue-500">Stream</span></h1>
        <div className="flex items-center gap-8">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input type="text" placeholder="Search Neural_Database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-900 border border-slate-800 pl-12 pr-6 py-3 rounded-full text-xs outline-none focus:border-blue-500 w-80 transition-all font-mono" />
          </div>
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <button onClick={() => setView('browse')} className={`hover:text-white transition-colors flex items-center gap-2 ${view === 'browse' ? 'text-blue-500' : ''}`}>
              <LayoutGrid size={14} /> Browse
            </button>
            <button onClick={() => setView('watchlist')} className={`hover:text-white transition-colors flex items-center gap-2 ${view === 'watchlist' ? 'text-blue-500' : ''}`}>
              <Bookmark size={14} /> Vault ({watchlist.length})
            </button>
            <button onClick={() => setView('profile')} className={`hover:text-white transition-colors flex items-center gap-2 ${view === 'profile' ? 'text-blue-500' : ''}`}>
              <User size={14} /> Profile
            </button>
            <button onClick={() => supabase.auth.signOut()} className="bg-slate-900 p-3 rounded-xl hover:text-red-500 hover:border-red-500/20 transition-all border border-slate-800">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="p-8 max-w-[1600px] mx-auto">
        {view === 'browse' ? (
          <>
            {/* Genre Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => { setSelectedGenre(genre.id); setSearchQuery(''); }}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    selectedGenre === genre.id 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/30 -translate-y-1' 
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-600'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>

            {/* Movie Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
              <AnimatePresence mode='popLayout'>
                {mediaList.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onSelect={setSelectedMedia} 
                    onAdd={addToWatchlist} 
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {mediaList.length > 0 && (
              <div className="flex justify-center mt-20">
                <button onClick={() => fetchMedia(searchQuery, true)} disabled={loading} className="px-16 py-5 bg-slate-900 border border-slate-800 rounded-3xl text-[11px] font-black uppercase text-slate-500 hover:text-white hover:border-blue-500 transition-all shadow-lg hover:shadow-blue-600/10 active:scale-95">
                  {loading ? 'Decrypting_New_Signals...' : 'Request_More_Data'}
                </button>
              </div>
            )}
          </>
        ) : view === 'watchlist' ? (
          <div className="animate-in fade-in duration-500">
            {/* Watchlist Filter Header */}
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Identifier_Vault</h3>
              <div className="flex gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-800">
                {['all', 'to_watch', 'completed'].map((f) => (
                  <button key={f} onClick={() => setWatchlistFilter(f)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${watchlistFilter === f ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}>
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Watchlist Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              <AnimatePresence>
                {watchlist.filter(i => watchlistFilter === 'all' ? true : i.status === watchlistFilter).map((item) => (
                  <motion.div layout initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} key={item.id} className="relative group bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all shadow-2xl">
                    <img src={`https://images.weserv.nl/?url=https://image.tmdb.org/t/p/w500${item.poster_path}`} className="w-full aspect-[2/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                      <button onClick={() => toggleWatchlistStatus(item.id, item.status)} className={`p-3 rounded-2xl text-white shadow-xl ${item.status === 'completed' ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'}`}>
                        {item.status === 'completed' ? <Check size={18} /> : <div className="w-4 h-4 border-2 border-white rounded-full" />}
                      </button>
                      <button onClick={() => removeFromWatchlist(item.id)} className="bg-red-600 p-3 rounded-2xl text-white shadow-xl hover:bg-red-500 transition-colors">
                        <X size={18} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-xs font-black uppercase italic text-white truncate mb-1">{item.title}</p>
                      <div className="flex items-center gap-2">
                        <Star size={10} className="fill-blue-500 text-blue-500" />
                        <span className="text-[9px] font-mono text-slate-400">{item.vote_average?.toFixed(1)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {watchlist.length === 0 && (
              <div className="mt-32 text-center">
                <div className="text-slate-800 text-[10rem] font-black italic select-none">EMPTY</div>
                <p className="text-slate-600 uppercase tracking-[0.5em] font-black -mt-12">Vault_Empty // No_Signals_Registered</p>
              </div>
            )}
          </div>
        ) : <ProfileView user={user} profile={profile} watchlist={watchlist} />}
      </main>

      {/* --- NEURAL MODAL (Selected Media) --- */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/95 flex items-center justify-center p-4 z-[100] backdrop-blur-2xl" onClick={() => setSelectedMedia(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-slate-900 border border-slate-800 max-w-7xl w-full flex flex-col md:flex-row rounded-[3rem] overflow-hidden h-[90vh] shadow-[0_0_100px_rgba(37,99,235,0.2)] relative" onClick={e => e.stopPropagation()}>
              
              {/* Left Side: Trailer / Media Focus */}
              <div className="w-full md:w-[45%] relative border-r border-slate-800 bg-black flex flex-col group">
                <div className="flex-1 relative bg-black flex items-center justify-center">
                  {trailerKey ? (
                    <>
                      <iframe 
                        src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`} 
                        className="w-full h-full object-cover z-10 border-0" 
                        title="Neural Trailer" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                      <a href={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-8 right-8 z-20 bg-red-600/90 hover:bg-red-600 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2 shadow-2xl">
                        <Play size={14} fill="white" /> External_Stream
                      </a>
                    </>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-900 overflow-hidden">
                       <img src={`https://images.weserv.nl/?url=https://image.tmdb.org/t/p/w500${selectedMedia.poster_path}`} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl scale-110" alt="" />
                       <div className="relative z-10 text-center">
                         <div className="text-purple-500/20 mb-4 flex justify-center"><Database size={80} /></div>
                         <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest px-6 py-3 border border-purple-500/20 bg-black/50 rounded-full">Source_Signal_Unavailable</span>
                       </div>
                    </div>
                  )}
                </div>
                <div className="p-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-600 text-[10px] font-black px-3 py-1 rounded-lg italic tracking-tighter">SCORE_{selectedMedia.vote_average?.toFixed(1)}</span>
                    <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">{selectedMedia.release_date?.split('-')[0]} // RELEASE_TAG</span>
                  </div>
                  <h2 className="text-4xl font-black mb-6 uppercase italic tracking-tighter leading-none">{selectedMedia.title}</h2>
                  <p className="text-slate-400 text-[11px] leading-relaxed uppercase font-mono line-clamp-6 tracking-tight border-l-2 border-blue-600/30 pl-6">{selectedMedia.overview}</p>
                </div>
              </div>

              {/* Right Side: Community Feed & Neural Rating */}
              <div className="flex-1 flex flex-col bg-slate-900/50 overflow-hidden relative">
                {/* Community Header with Stats */}
                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-950/30 backdrop-blur-md">
                  <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Neural_Community_Feed</h4>
                    <p className="text-[9px] text-blue-500 font-mono mt-1 uppercase tracking-tighter">Analyzing_User_Input... [OK]</p>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="h-10 w-[1px] bg-slate-800" />
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-white tracking-tighter tabular-nums">{userAverage}</span>
                      <div className="flex flex-col text-[8px] font-bold uppercase leading-none">
                        <span className="text-slate-500">User_Avg</span>
                        <span className="text-blue-500">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reviews Feed */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar">
                  {mediaReviews.length > 0 ? (
                    mediaReviews.map((rev, idx) => (
                      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} key={idx} className="bg-black/30 border border-slate-800/50 p-6 rounded-[2rem] hover:border-blue-500/20 transition-all group">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-bold text-blue-400 font-mono italic uppercase flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> USER_{rev.user_id?.slice(0, 8)}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={8} className={i < rev.user_rating ? "fill-blue-500 text-blue-500" : "text-slate-800"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-300 text-[11px] italic leading-relaxed font-medium">"{rev.review_text}"</p>
                        <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[8px] text-slate-600 font-mono uppercase">{new Date(rev.created_at).toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                      <div className="text-slate-800 mb-4 animate-pulse"><Activity size={60} /></div>
                      <div className="text-[10px] text-slate-700 uppercase italic font-black tracking-[0.3em]">
                        // No_Signals_Detected_In_Sector_Area
                      </div>
                    </div>
                  )}
                </div>

                {/* Feedback Input Area */}
                <div className="p-10 bg-slate-950/80 border-t border-slate-800 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Assign_Neural_Score:</span>
                    <div className="flex gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button key={num} onClick={() => setRating(num)} className={`w-10 h-10 rounded-xl border transition-all text-[11px] font-black flex items-center justify-center ${rating >= num ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/30' : 'bg-black/40 border-slate-800 text-slate-500 hover:border-slate-700'}`}>
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <input 
                      value={review} 
                      onChange={(e) => setReview(e.target.value)} 
                      placeholder="Inject_User_Perception_Data..." 
                      className="flex-1 bg-black/60 border border-slate-800 px-6 py-4 rounded-2xl text-xs text-white outline-none focus:border-blue-500 transition-all font-mono" 
                    />
                    <button onClick={() => submitReview(selectedMedia.id)} className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                      Transmit
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <button onClick={() => setSelectedMedia(null)} className="absolute top-8 right-8 text-slate-600 hover:text-white transition-all z-[110] bg-slate-950/50 p-2 rounded-full border border-slate-800 hover:border-blue-500 group">
                <X size={24} className="group-rotate-90 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;