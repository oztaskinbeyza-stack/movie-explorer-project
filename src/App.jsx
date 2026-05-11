import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';
import { fallbackMedia } from './fallbackData';
import MovieCard from './MovieCard';
import { motion, AnimatePresence } from 'framer-motion';

// --- ROLE-BASED DASHBOARDS ---

const AdminDashboard = ({ stats, profile }) => (
  <div className="min-h-screen bg-slate-950 p-8 font-mono text-slate-300">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-red-500/20 pb-8">
        <div>
          <h2 className="text-4xl font-black text-red-500 tracking-tighter uppercase italic">Admin_Root_Terminal</h2>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] mt-2">Active_Session: {profile?.email}</p>
        </div>
        <button onClick={() => supabase.auth.signOut()} className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all">Terminate_Session</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total_Users', value: stats.users, icon: 'USER_ID' },
          { label: 'Total_Reviews', value: stats.reviews, icon: 'DATA_STREAM' },
          { label: 'Global_Watchlist', value: stats.watchlist, icon: 'STORAGE_UNIT' }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-4xl font-black italic">{item.icon}</span>
            </div>
            <h4 className="text-[10px] font-black text-red-500/50 uppercase tracking-[0.3em] mb-4">{item.label}</h4>
            <div className="text-5xl font-black text-white tracking-tighter">{item.value}</div>
            <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 w-1/3 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-black/40 border border-slate-900 p-6 rounded-3xl">
        <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">System_Log: Fetching_Realtime_Metrics... OK</p>
      </div>
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

const ProfileView = ({ user, profile, watchlist }) => (
  <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <span className="text-8xl font-black italic">CORE</span>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-blue-500/20">
          {profile?.email?.[0].toUpperCase() || 'U'}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white mb-1">
            {profile?.email?.split('@')[0]}
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            Access_Level: <span className="text-blue-500">{profile?.role || 'User'}</span>
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'Watchlist_Load', value: watchlist.length, unit: 'Items' },
        { label: 'Completed_Files', value: watchlist.filter(i => i.status === 'completed').length, unit: 'Media' },
        { label: 'System_Status', value: 'Stable', unit: 'Verified' }
      ].map((stat, idx) => (
        <div key={idx} className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl hover:border-blue-500/30 transition-all">
          <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
            <span className="text-[10px] font-bold text-blue-500/50 uppercase">{stat.unit}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 p-6 border border-slate-800/50 rounded-3xl bg-black/20 font-mono text-[9px] uppercase tracking-tighter text-slate-600">
      IDENTIFIER: {user?.id}<br />
      LAST_SYNC: {new Date().toLocaleString()}<br />
      ENCRYPTION: AES_256_ACTIVE
    </div>
  </div>
);

// --- MAIN APPLICATION ---

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
  const [page, setPage] = useState(1);
  const [notificationCount, setNotificationCount] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  };

  const sendAutoNotification = async (msg) => {
    if (!user) return;
    await supabase.from('notifications').insert([{ user_id: user.id, message: msg }]);
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) showToast(error.message, 'error');
    else showToast('System_Notice: Account_Created_Success');
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) showToast('Auth_Failure: Invalid_Credentials', 'error');
    else showToast('Access_Granted: Welcome_to_VibeFlow');
  };

  const fetchMedia = async (query = '', isNextPage = false) => {
    if (!API_KEY) return;
    setLoading(true);
    const currentPage = isNextPage ? page + 1 : 1;
    const endpoint = query 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error();
      const data = await response.json();
      setMediaList(isNextPage ? [...mediaList, ...(data.results || [])] : (data.results || []));
      setPage(currentPage);
    } catch (error) {
      if (!isNextPage) setMediaList(fallbackMedia);
      showToast("Data_Stream_Interrupted: Loading Fallback", "error");
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
    const { data, error } = await supabase.from('watchlists').select('*');
    if (!error) setWatchlist(data || []);
  };

  const fetchStats = async () => {
    const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: r } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
    const { count: w } = await supabase.from('watchlists').select('*', { count: 'exact', head: true });
    setStats({ users: u || 0, reviews: r || 0, watchlist: w || 0 });
  };

  const fetchReviews = async (mediaId) => {
    const { data } = await supabase.from('reviews').select('*').eq('media_id', mediaId).order('created_at', { ascending: false });
    setMediaReviews(data || []);
  };

const addToWatchlist = async (mediaItem) => {
    const isDuplicate = watchlist.some(item => String(item.media_id) === String(mediaItem.id));

    if (isDuplicate) {
      showToast('Validation_Error: Media_Already_Registered', 'error');
      return;
    }

    const { error } = await supabase.from('watchlists').insert([{ 
      media_id: mediaItem.id, 
      title: mediaItem.title, 
      poster_path: mediaItem.poster_path, 
      vote_average: mediaItem.vote_average, 
      user_id: user?.id, 
      status: 'to_watch'
    }]);

    if (!error) { 
      fetchWatchlist(); 
      showToast(`Sync_Complete: ${mediaItem.title}_Added`); 
    } else {
      showToast('Database_Error: Write_Failed', 'error');
    }
  };

  const removeFromWatchlist = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) fetchWatchlist();
  };

  const toggleWatchlistStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'to_watch' ? 'completed' : 'to_watch';
    const { error } = await supabase.from('watchlists').update({ status: newStatus }).eq('id', id);
    if (!error) fetchWatchlist();
  };

  const submitReview = async (mediaId) => {
    if (!review) return;
    const { error } = await supabase.from('reviews').insert([{ media_id: mediaId, review_text: review, user_rating: rating, user_id: user.id }]);
    if (!error) { 
      setReview(''); 
      fetchReviews(mediaId); 
      showToast('Data_Injected: Review_Published'); 
      sendAutoNotification(`You successfully posted a review for this movie!`);
    }
  };

  useEffect(() => {
    if (user) {
      const channel = supabase.channel('realtime_notifications').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, (payload) => {
        setNotificationCount(prev => prev + 1);
        showToast(`New Notification: ${payload.new.message}`);
      }).subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [user]);

  useEffect(() => { fetchMedia(searchQuery); }, [searchQuery]);
  useEffect(() => { if (user) { fetchWatchlist(); if (profile?.role === 'Admin') fetchStats(); } }, [user, profile]);
  useEffect(() => { if (selectedMedia) { fetchReviews(selectedMedia.id); fetchTrailer(selectedMedia.id); } }, [selectedMedia]);

  if (authLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>;

  const filteredWatchlist = watchlist.filter(item => watchlistFilter === 'all' ? true : item.status === watchlistFilter);

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
        <div className="relative z-10 bg-slate-900/90 p-12 rounded-[2rem] border border-slate-800/60 w-full max-w-md shadow-2xl backdrop-blur-3xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-black tracking-tighter italic uppercase mb-2 text-white">Vibe<span className="text-blue-500">Flow</span></h2>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.5em] uppercase">Core_System_v1</p>
          </div>
          <div className="space-y-5">
            <input type="email" placeholder="root@vibeflow.sys" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-4 rounded-xl text-white outline-none font-mono text-xs" />
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-4 rounded-xl text-white outline-none font-mono text-xs" />
            <button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all">Execute_Auth</button>
            <button onClick={handleSignUp} className="w-full bg-transparent hover:bg-slate-800 text-slate-500 py-4 rounded-xl font-bold uppercase border border-slate-800/50 text-[10px]">New_System_Request</button>
          </div>
        </div>
      </div>
    );
  }

  if (profile?.role === 'Admin') return <AdminDashboard stats={stats} profile={profile} />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      {toast.message && (
        <div className="fixed top-24 right-8 z-[200] animate-in fade-in slide-in-from-right-8 duration-300">
          <div className={`px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-4 ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">{toast.message}</span>
          </div>
        </div>
      )}
      
      <nav className="p-6 flex justify-between items-center border-b border-slate-900 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-black italic tracking-tighter leading-none">Vibe<span className="text-blue-500">Flow</span></h1>
        <div className="flex items-center gap-6">
          <input type="text" placeholder="Search database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-xs outline-none focus:border-blue-500 w-64 transition-all" />
          <button onClick={() => setView('browse')} className={`text-[10px] font-bold uppercase tracking-widest ${view === 'browse' ? 'text-blue-500' : 'text-slate-500'}`}>Browse</button>
          <button onClick={() => setView('watchlist')} className={`text-[10px] font-bold uppercase tracking-widest ${view === 'watchlist' ? 'text-blue-500' : 'text-slate-500'}`}>Watchlist ({watchlist.length})</button>
          <button onClick={() => { setView('profile'); setNotificationCount(0); }} className="relative text-[10px] font-bold uppercase text-slate-500">
            Profile_System
            {notificationCount > 0 && <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">{notificationCount}</span>}
          </button>
          <button onClick={() => supabase.auth.signOut()} className="bg-slate-900 p-2 rounded-lg hover:text-red-500 transition-all text-[10px] font-bold uppercase border border-slate-800">Exit</button>
        </div>
      </nav>

      <main className="p-8">
        {view === 'browse' ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              <AnimatePresence>
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
            {mediaList.length > 0 && (
              <div className="flex justify-center mt-16">
                <button onClick={() => fetchMedia(searchQuery, true)} disabled={loading} className="px-12 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all">
                  {loading ? 'Requesting_Data...' : 'Load_More'}
                </button>
              </div>
            )}
          </>
        ) : view === 'watchlist' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-full flex gap-4 mb-8 bg-slate-900/50 p-2 rounded-2xl w-fit border border-slate-800">
              {['all', 'to_watch', 'completed'].map((f) => (
                <button key={f} onClick={() => setWatchlistFilter(f)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${watchlistFilter === f ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>{f.replace('_', ' ')}</button>
              ))}
            </div>
            {filteredWatchlist.map((item) => (
              <div key={item.id} className="relative group bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="w-full aspect-[2/3] object-cover" alt="" />
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => toggleWatchlistStatus(item.id, item.status)} className={`p-2 rounded-xl text-white ${item.status === 'completed' ? 'bg-green-600' : 'bg-indigo-600'}`}>{item.status === 'completed' ? '✓' : '○'}</button>
                  <button onClick={() => removeFromWatchlist(item.id)} className="bg-red-600 p-2 rounded-xl text-white font-bold">X</button>
                </div>
              </div>
            ))}
          </div>
        ) : <ProfileView user={user} profile={profile} watchlist={watchlist} />}
      </main>

<div className="flex-1 relative bg-black flex items-center justify-center group">
  {trailerKey ? (
    <>
      <iframe 
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0`} 
        className="w-full h-full object-cover z-10" 
        title="Trailer" 
        allowFullScreen
      ></iframe>
      
      <a 
        href={`https://www.youtube.com/watch?v=${trailerKey}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-20 bg-red-600/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all opacity-0 group-hover:opacity-100"
      >
        Watch_On_YouTube
      </a>
    </>
  ) : (
    <div className="relative w-full h-full">
      <img 
        src={`https://images.weserv.nl/?url=https://image.tmdb.org/t/p/w500${selectedMedia.poster_path}`} 
        className="w-full h-full object-cover opacity-40 blur-sm" 
        alt="" 
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800">
          Trailer_Not_Available_In_Sector
        </span>
      </div>
    </div>
  )}
</div>
    </div>
  );
}

export default App;