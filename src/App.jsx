/**
 * NOVASTREAM NEURAL INTERFACE - VERSION 1.4.2
 * PROJECT: PaaS Startup "Metonium" Core
 * THEME: Tech-Noir / Cyan & Slate Aesthetic
 * FEATURES: Multi-Role Dashboards, Infinite Scroll, Row Navigation, 
 * Neural Data Injection (Reviews), Real-time Synchronization.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';
import { fallbackMedia } from './fallbackData';
import MovieCard from './MovieCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Play, Plus, Check, X, Shield, Activity, 
  Database, LogOut, Search, User, LayoutGrid, 
  Bookmark, ChevronLeft, ChevronRight, Calendar, 
  Globe, Info, MessageSquare, Award, Terminal,
  Cpu, Zap, HardDrive, Bell, Settings
} from 'lucide-react';

// =========================================================================
// --- 1. COMPONENT: ADMIN_ROOT_TERMINAL (FULL ANALYTICS) ---
// =========================================================================

const AdminDashboard = ({ stats, profile }) => {
  return (
    <div className="min-h-screen bg-[#020617] p-12 font-mono text-slate-300 selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto">
        {/* Terminal Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-red-500/20 pb-16 gap-10">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <Terminal size={32} className="animate-pulse" />
              <span className="text-[12px] font-black uppercase tracking-[0.6em]">Protocol_ID: ROOT_01_ALPHA</span>
            </div>
            <h2 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
              Central_<span className="text-red-600">Admin</span>_Node
            </h2>
            <div className="flex items-center gap-10 mt-10">
              <div className="flex flex-col gap-1">
                <span className="text-slate-600 text-[9px] uppercase tracking-widest">Active_Operator</span>
                <p className="text-slate-300 text-[11px] uppercase tracking-[0.4em]">{profile?.email}</p>
              </div>
              <div className="flex flex-col gap-1 border-l border-slate-800 pl-10">
                <span className="text-slate-600 text-[9px] uppercase tracking-widest">Uptime_Status</span>
                <p className="text-green-500 text-[11px] uppercase tracking-[0.4em] animate-pulse">Running_Stable</p>
              </div>
            </div>
          </motion.div>
          
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="group relative overflow-hidden bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-12 py-5 rounded-[2.5rem] text-[12px] font-black uppercase transition-all duration-500 shadow-2xl shadow-red-600/10 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-4"><LogOut size={18} /> Kill_All_Processes</span>
          </button>
        </header>

        {/* Neural Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Network_Participants', value: stats.users, icon: <User size={40} />, color: 'bg-red-600' },
            { label: 'Global_Review_Nodes', value: stats.reviews, icon: <MessageSquare size={40} />, color: 'bg-orange-600' },
            { label: 'Encrypted_Vault_Archive', value: stats.watchlist, icon: <Database size={40} />, color: 'bg-amber-600' }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: idx * 0.15 }}
              className="bg-slate-900/40 border border-slate-800 p-16 rounded-[4.5rem] relative overflow-hidden group hover:border-red-500/40 transition-all duration-700"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-opacity text-white">
                {item.icon}
              </div>
              <h4 className="text-[11px] font-black text-red-500/50 uppercase tracking-[0.5em] mb-10">{item.label}</h4>
              <div className="text-8xl font-black text-white tracking-tighter tabular-nums mb-10 leading-none">{item.value}</div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: '60%' }} 
                  transition={{ duration: 2, ease: "easeOut", delay: idx * 0.2 }}
                  className={`h-full ${item.color} shadow-[0_0_20px_rgba(220,38,38,0.5)]`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Activity Log */}
        <div className="mt-20 bg-slate-900/20 border border-slate-800/50 p-10 rounded-[3rem] font-mono">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-4">Live_Neural_Log:</p>
          <div className="space-y-2 opacity-60">
            <p className="text-[9px] text-red-500/80 uppercase">>> Fetching_Realtime_Metrics_From_Core... [SUCCESS]</p>
            <p className="text-[9px] text-slate-500 uppercase">>> Memory_Allocation: 14.2GB / 64GB ... [OK]</p>
            <p className="text-[9px] text-slate-500 uppercase">>> Routing_Encryption_Table: RSA-4096 ... [ACTIVE]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// --- 2. COMPONENT: STAFF_INTERFACE (MODERATION ACCESS) ---
// =========================================================================

const StaffDashboard = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center p-10 font-mono">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      className="bg-slate-900 p-24 border border-blue-500/20 rounded-[5.5rem] w-full max-w-2xl text-center backdrop-blur-3xl shadow-[0_0_150px_rgba(37,99,235,0.1)] relative"
    >
      <div className="w-32 h-32 bg-blue-500/10 rounded-[3.5rem] flex items-center justify-center text-blue-500 mx-auto mb-14 border border-blue-500/20 shadow-inner">
        <Activity size={64} className="animate-pulse" />
      </div>
      <h2 className="text-5xl font-black text-blue-500 mb-6 tracking-tighter uppercase italic leading-none">Staff_Sector</h2>
      <p className="text-slate-500 mb-16 text-[13px] font-medium uppercase tracking-[0.5em] leading-relaxed">
        Neural_Content_Moderation <br /> <span className="text-blue-500/40">Protocol: Blue_Cipher_Active</span>
      </p>
      <button 
        onClick={() => supabase.auth.signOut()} 
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[14px] transition-all shadow-2xl shadow-blue-600/40 active:scale-95"
      >
        Close_Encrypted_Link
      </button>
    </motion.div>
  </div>
);

// =========================================================================
// --- 3. COMPONENT: PROFILE_CORE_VIEW ---
// =========================================================================

const ProfileView = ({ user, profile, watchlist }) => (
  <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-20 duration-1000">
    <div className="bg-slate-900 border border-slate-800 rounded-[6rem] p-24 mb-20 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
      <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[25rem] font-black italic text-cyan-500 leading-none">NODE</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <div className="w-60 h-60 bg-gradient-to-br from-cyan-500 via-cyan-800 to-slate-950 rounded-[5rem] flex items-center justify-center text-7xl font-black text-white shadow-[0_40px_80px_rgba(6,182,212,0.4)] border-[6px] border-white/10">
          {profile?.email?.[0].toUpperCase() || 'U'}
        </div>
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.7em]">Neural_Unit_Verified</span>
          </div>
          <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white mb-8 leading-none drop-shadow-lg">
            {profile?.email?.split('@')[0]}
          </h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            <span className="bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 px-10 py-4 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.4em]">
              Level: {profile?.role || 'User'}
            </span>
            <span className="bg-slate-800/50 text-slate-400 border border-slate-700 px-10 py-4 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.4em]">
              Clearance_ID: 104-B
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[
        { label: 'Synced_Objects', value: watchlist.length, unit: 'Nodes', desc: 'Objects stored in secure vault' },
        { label: 'Neural_Uptime', value: '99.9%', unit: 'Sync', desc: 'Real-time database connectivity' },
        { label: 'Integrity_Status', value: 'Prime', unit: 'Logic', desc: 'Metadata checksum validation' }
      ].map((stat, idx) => (
        <motion.div 
          key={idx} 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.5 + (idx * 0.1) }}
          className="bg-slate-900/40 border border-slate-800 p-14 rounded-[4rem] hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-all" />
          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-8 group-hover:text-cyan-500 transition-colors">{stat.label}</h4>
          <div className="flex items-baseline gap-5 mb-6">
            <span className="text-7xl font-black text-white tracking-tighter tabular-nums leading-none">{stat.value}</span>
            <span className="text-[13px] font-bold text-cyan-500/40 uppercase tracking-tighter italic">{stat.unit}</span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium uppercase tracking-[0.2em] leading-relaxed">{stat.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// =========================================================================
// --- 4. MASTER_APPLICATION_LOGIC (FULL_UNABRIDGED) ---
// =========================================================================

function App() {
  const { user, profile, loading: authLoading } = useAuth();
  
  // -- State Hooks --
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
  const [toast, setToast] = useState({ message: '', type: null });
  const [stats, setStats] = useState({ users: 0, reviews: 0, watchlist: 0 });
  const [page, setPage] = useState(1);
  const [trailerKey, setTrailerKey] = useState(null);
  const loaderRef = useRef(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // -- Core Utilities --
  
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  }, []);

  const fetchMedia = async (query = '', isNextPage = false) => {
    if (!API_KEY) return;
    setLoading(true);
    const currentPage = isNextPage ? page + 1 : 1;
    
    let endpoint = query 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("API_REJECTED_CONNECTION");
      const data = await response.json();
      const validResults = data.results || [];
      
      setMediaList(prev => isNextPage ? [...prev, ...validResults] : validResults);
      setPage(currentPage);
    } catch (error) {
      if (!isNextPage) setMediaList(fallbackMedia);
      showToast("Data_Stream_Interrupted_By_Core", "error");
    } finally {
      // Simulate decryption processing time
      setTimeout(() => setLoading(false), 600);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();
      const trailer = data.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) { 
      console.error("Signal_Trailer_Missing", error); 
      setTrailerKey(null);
    }
  };

  const fetchWatchlist = useCallback(async () => {
    const { data, error } = await supabase.from('watchlists').select('*').order('created_at', { ascending: false });
    if (!error) setWatchlist(data || []);
  }, []);

  const fetchReviews = async (mediaId) => {
    if (!mediaId) return;
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('media_id', String(mediaId))
      .order('created_at', { ascending: false });
    if (!error) setMediaReviews(data || []);
  };

  const fetchStats = useCallback(async () => {
    const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: r } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
    const { count: w } = await supabase.from('watchlists').select('*', { count: 'exact', head: true });
    setStats({ users: u || 0, reviews: r || 0, watchlist: w || 0 });
  }, []);

  // -- Interaction Actions --

  const submitReview = async (mediaId) => {
    if (!review || !user) return;
    const { error } = await supabase.from('reviews').insert([{ 
      media_id: String(mediaId), 
      review_text: review, 
      user_rating: rating, 
      user_id: user.id 
    }]);
    
    if (!error) { 
      setReview(''); 
      await fetchReviews(mediaId); 
      showToast('Neural_Perception_Injected'); 
    } else {
      showToast('Injection_Failed: Core_Lock', 'error');
    }
  };

  const addToWatchlist = async (mediaItem) => {
    const isDuplicate = watchlist.some(item => String(item.media_id) === String(mediaItem.id));
    if (isDuplicate) return showToast('Duplicate_Object_Detected', 'error');
    
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
      showToast('Object_Synced_to_Vault'); 
    }
  };

  const removeFromWatchlist = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) { 
      fetchWatchlist(); 
      showToast('Object_Purged_from_Sync', 'error'); 
    }
  };

  const toggleWatchlistStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'to_watch' ? 'completed' : 'to_watch';
    const { error } = await supabase.from('watchlists').update({ status: newStatus }).eq('id', id);
    if (!error) fetchWatchlist();
  };

  // --- 5. LIFECYCLE_MANAGEMENT ---

  useEffect(() => { fetchMedia(searchQuery); }, [searchQuery]);
  
  useEffect(() => { 
    if (user) { 
      fetchWatchlist(); 
      if (profile?.role === 'Admin') fetchStats(); 
    } 
  }, [user, profile, fetchWatchlist, fetchStats]);

  useEffect(() => { 
    if (selectedMedia) { 
      fetchReviews(selectedMedia.id); 
      fetchTrailer(selectedMedia.id); 
    } 
  }, [selectedMedia]);

  // Observer Logic for Automated Infinite Fetch
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && view === 'browse') {
        fetchMedia(searchQuery, true);
      }
    }, { threshold: 0.1, rootMargin: '400px' });
    
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
  }, [loading, searchQuery, view]);

  if (authLoading) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-10">
      <div className="w-24 h-24 border-[12px] border-cyan-950 border-t-cyan-500 rounded-full animate-spin"></div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-[12px] font-black uppercase tracking-[1.2em] text-cyan-500 animate-pulse">Initializing_NovaStream</span>
        <span className="text-slate-800 text-[9px] uppercase font-mono italic">Syncing_Neural_Cores... [OK]</span>
      </div>
    </div>
  );

  const userAverage = mediaReviews.length > 0 ? (mediaReviews.reduce((acc, rev) => acc + rev.user_rating, 0) / mediaReviews.length).toFixed(1) : "0.0";

  // --- 6. AUTHENTICATION_INTERFACE ---

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 z-0 flex gap-8 opacity-[0.05] pointer-events-none skew-y-12 scale-150">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
            <div key={col} className="flex-1 flex flex-col gap-8 animate-infinite-scroll">
              {[...mediaList, ...mediaList, ...mediaList].slice(0, 40).map((movie, idx) => (
                <img key={idx} src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : 'https://via.placeholder.com/400x600'} className="w-full rounded-[3rem] grayscale brightness-50 shadow-2xl" alt="" />
              ))}
            </div>
          ))}
        </div>

        {/* Auth Interface Card */}
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          className="relative z-10 bg-slate-900/90 p-20 rounded-[6rem] border border-slate-800/60 w-full max-w-lg shadow-[0_0_200px_rgba(6,182,212,0.1)] backdrop-blur-4xl text-center"
        >
          <div className="mb-20">
            <h2 className="text-8xl font-black tracking-tighter italic uppercase mb-4 text-white leading-none">
              Nova<span className="text-cyan-500">Stream</span>
            </h2>
            <div className="flex items-center justify-center gap-5">
              <div className="h-[2px] w-12 bg-slate-800" />
              <p className="text-slate-500 text-[12px] font-black tracking-[0.6em] uppercase">Neural_Core_v1.4.2</p>
              <div className="h-[2px] w-12 bg-slate-800" />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-3 text-left">
              <label className="text-[11px] font-black uppercase text-slate-700 tracking-[0.4em] ml-6">Input_Identifier</label>
              <input type="email" placeholder="root@novastream.sys" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-8 rounded-[2.5rem] text-white outline-none font-mono text-xs focus:border-cyan-500 transition-all placeholder:text-slate-900" />
            </div>
            <div className="space-y-3 text-left">
              <label className="text-[11px] font-black uppercase text-slate-700 tracking-[0.4em] ml-6">Input_Passkey</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-8 rounded-[2.5rem] text-white outline-none font-mono text-xs focus:border-cyan-500 transition-all placeholder:text-slate-900" />
            </div>
            <button 
              onClick={async () => { 
                const {error} = await supabase.auth.signInWithPassword({email, password}); 
                if(error) showToast("Identity_Check_Rejected", "error"); 
              }} 
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-3xl shadow-cyan-600/30 transition-all active:scale-95 mt-6"
            >
              Establish_Session
            </button>
            <button 
              onClick={async () => { 
                const {error} = await supabase.auth.signUp({email, password}); 
                if(error) showToast(error.message, "error"); 
              }} 
              className="w-full bg-transparent hover:bg-slate-800/50 text-slate-700 py-5 rounded-[2.5rem] font-black uppercase text-[11px] border border-slate-800/50 transition-all tracking-[0.1em]"
            >
              Request_New_Unit_Allocation
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- 8. DASHBOARD_ROUTING_LOGIC ---

  if (profile?.role === 'Admin') return <AdminDashboard stats={stats} profile={profile} />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  // --- 9. PRIMARY_USER_INTERFACE ---

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* GLOBAL_SYSTEM_NOTIFICATIONS */}
      <AnimatePresence>
        {toast.message && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed bottom-12 right-12 z-[400]">
            <div className={`px-12 py-7 rounded-[2.5rem] border backdrop-blur-3xl shadow-3xl flex items-center gap-8 ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'}`}>
              <div className={`w-3 h-3 rounded-full animate-ping ${toast.type === 'error' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]'}`} />
              <span className="text-[12px] font-black uppercase tracking-[0.4em] font-mono">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* NAVIGATION_ARCHITECTURE */}
      <nav className="px-16 py-12 flex justify-between items-center border-b border-slate-900 bg-slate-950/80 backdrop-blur-3xl sticky top-0 z-[100]">
        <div className="flex items-center gap-20">
          <h1 className="text-5xl font-black italic tracking-tighter leading-none hover:scale-110 transition-all cursor-pointer select-none group" onClick={() => setView('browse')}>
            Nova<span className="text-cyan-500 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all">Stream</span>
          </h1>
          <div className="relative group hidden xl:block">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-800 group-focus-within:text-cyan-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Inject_Query_to_Database..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="bg-slate-900/50 border border-slate-800/80 pl-16 pr-10 py-5 rounded-[2rem] text-[13px] outline-none focus:border-cyan-500 w-[450px] transition-all font-mono text-slate-300 placeholder:text-slate-900" 
            />
          </div>
        </div>

        <div className="flex items-center gap-14 text-[12px] font-black uppercase tracking-[0.4em] text-slate-600">
          <button onClick={() => setView('browse')} className={`hover:text-white flex items-center gap-4 transition-all ${view === 'browse' ? 'text-cyan-500' : ''}`}><LayoutGrid size={20} /> Browse</button>
          <button onClick={() => setView('watchlist')} className={`hover:text-white flex items-center gap-4 transition-all ${view === 'watchlist' ? 'text-cyan-500' : ''}`}><Bookmark size={20} /> Watchlist ({watchlist.length})</button>
          <button onClick={() => setView('profile')} className={`hover:text-white flex items-center gap-4 transition-all ${view === 'profile' ? 'text-cyan-500' : ''}`}><User size={20} /> Profile</button>
          <div className="h-12 w-[1px] bg-slate-900 mx-4" />
          <button onClick={() => supabase.auth.signOut()} className="bg-slate-900 hover:bg-red-500/10 p-4.5 rounded-[1.5rem] border border-slate-800 text-slate-600 hover:text-red-500 transition-all"><LogOut size={22} /></button>
        </div>
      </nav>

      {/* DYNAMIC_CORE_VIEWPORT */}
      <main className="p-16 max-w-[1800px] mx-auto">
{/* --- BROWSE VIEW: PRIME_STYLE_NEURAL_ROWS --- */}
{view === 'browse' ? (
  <div className="space-y-24 animate-in fade-in duration-1000 pb-20 overflow-hidden">
    
    {[
      { title: "Trending_Signals", data: mediaList.slice(0, 15) },
      { title: "Neural_Top_Rated", data: mediaList.slice(15, 30) }
    ].map((row, idx) => (
      <section key={idx} className="relative group/row px-4">
        {/* Row Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-8 w-[1px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50 italic">
            {row.title}
          </h3>
        </div>

        <div className="relative flex items-center">
          {/* Navigation: Left Button */}
          <button 
            onClick={(e) => e.currentTarget.nextSibling.scrollBy({ left: -600, behavior: 'smooth' })} 
            className="absolute -left-4 z-50 p-4 bg-black/90 border border-white/10 rounded-full text-white opacity-0 group-hover/row:opacity-100 transition-all hover:bg-cyan-600 shadow-2xl hidden md:block"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Horizontal Scroll Container */}
          <div className="flex flex-nowrap gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x w-full">
            {row.data.map((movie) => (
              <div key={movie.id} className="snap-start shrink-0">
                <MovieCard movie={movie} onSelect={setSelectedMedia} onAdd={addToWatchlist} />
              </div>
            ))}
          </div>

          {/* Navigation: Right Button */}
          <button 
            onClick={(e) => e.currentTarget.previousSibling.scrollBy({ left: 600, behavior: 'smooth' })} 
            className="absolute -right-4 z-50 p-4 bg-black/90 border border-white/10 rounded-full text-white opacity-0 group-hover/row:opacity-100 transition-all hover:bg-cyan-600 shadow-2xl hidden md:block"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    ))}

    {/* INFINITE ARCHIVE GRID (Deeper Discovery) */}
    <section className="px-4">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-8 w-[1px] bg-cyan-500" />
        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50 italic">
          Archive_Global_Data_Signals
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8">
        {mediaList.slice(30).map((movie) => (
          <div key={movie.id} className="flex justify-center">
             <MovieCard movie={movie} onSelect={setSelectedMedia} onAdd={addToWatchlist} />
          </div>
        ))}
      </div>
    </section>

    {/* INFINITE SCROLL TRIGGER POINT */}
    <div ref={loaderRef} className="h-60 flex flex-col items-center justify-center gap-6 opacity-20">
      {loading && (
        <>
          <div className="flex gap-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping" />
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping [animation-delay:0.2s]" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[1em] text-cyan-500 italic">
            Syncing_New_Nodes...
          </span>
        </>
      )}
    </div>
  </div>
) : view === 'watchlist' ? (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 px-6">
            <div className="flex items-center gap-12 mb-24">
              <h3 className="text-7xl font-black italic uppercase tracking-tighter text-white">Identifier_Vault</h3>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-900 via-slate-800 to-transparent" />
            </div>
            {watchlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-12">
                {watchlist.map((item) => (
                  <div key={item.id} className="relative group bg-slate-900/40 rounded-[3rem] overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all shadow-3xl">
                    <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750'} className="w-full aspect-[2/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.1] group-hover:scale-100" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                    <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover:opacity-100 translate-x-6 group-hover:translate-x-0 transition-all duration-700">
                      <button onClick={() => toggleWatchlistStatus(item.id, item.status)} className={`p-5 rounded-[1.5rem] text-white shadow-3xl transition-all ${item.status === 'completed' ? 'bg-green-600 shadow-green-600/20' : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/20'}`}>{item.status === 'completed' ? <Check size={24} /> : <Play size={24} />}</button>
                      <button onClick={() => removeFromWatchlist(item.id)} className="bg-red-600 p-5 rounded-[1.5rem] text-white shadow-3xl hover:bg-red-500 transition-all"><X size={24} /></button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-10">
                      <p className="text-[13px] font-black uppercase text-white truncate italic tracking-tighter leading-none">{item.title}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <Star size={12} className="fill-cyan-500 text-cyan-500" />
                        <span className="text-[11px] font-mono text-slate-500 tracking-tighter">{item.vote_average?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-60 opacity-[0.05] gap-16">
                <Database size={200} strokeWidth={0.5} className="text-white" />
                <h4 className="text-6xl font-black uppercase tracking-[0.8em] italic">Vault_Empty</h4>
              </div>
            )}
          </div>
        ) : <ProfileView user={user} profile={profile} watchlist={watchlist} />}
      </main>

      {/* --- NEURAL_INTERACTION_MODAL (FULL_DEPTH) --- */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/98 flex items-center justify-center p-10 md:p-24 z-[300] backdrop-blur-4xl" onClick={() => setSelectedMedia(null)}>
            <motion.div initial={{ scale: 0.95, y: 60 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 60 }} className="bg-[#050505] border border-white/5 max-w-[1600px] w-full flex flex-col md:flex-row rounded-[6rem] overflow-hidden h-[90vh] shadow-[0_0_200px_rgba(6,182,212,0.2)] relative" onClick={e => e.stopPropagation()}>
              
              {/* Media_Focus_Interface */}
              <div className="w-full md:w-[50%] relative bg-black flex flex-col border-r border-white/5">
                <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden group/player">
                  {trailerKey ? (
                    <>
                      <iframe src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`} className="w-full h-full border-0 z-10" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                      <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay pointer-events-none z-20" />
                    </>
                  ) : (
                    <div className="text-center p-24 flex flex-col items-center gap-10 opacity-[0.15]">
                      <Database size={140} strokeWidth={0.3} className="text-cyan-500" />
                      <span className="text-[13px] font-black uppercase tracking-[1em] text-cyan-500">Source_Signal_Unavailable</span>
                    </div>
                  )}
                </div>
                
                <div className="p-20 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <div className="flex items-center gap-8 mb-12 font-mono text-[11px] font-black uppercase">
                    <div className="flex items-center gap-3 bg-cyan-600 text-white px-5 py-2.5 rounded-xl italic shadow-lg shadow-cyan-600/30"><Star size={16} fill="white" /> SCORE_{selectedMedia.vote_average?.toFixed(1)}</div>
                    <span className="text-slate-500 flex items-center gap-3"><Calendar size={18} /> {selectedMedia.release_date?.split('-')[0]} // DATE_TAG</span>
                    <span className="text-slate-500 flex items-center gap-3 border-l border-white/10 pl-8"><Globe size={18} /> {selectedMedia.original_language?.toUpperCase()} // LOC_TAG</span>
                  </div>
                  <h2 className="text-7xl font-black mb-10 uppercase italic text-white tracking-tighter leading-[0.9] drop-shadow-[0_20px_20px_rgba(0,0,0,1)]">{selectedMedia.title}</h2>
                  <div className="flex gap-6 mb-10">
                    <div className="w-[3px] h-48 bg-cyan-500/40 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
                    <p className="text-white/40 text-[15px] leading-[2] font-medium uppercase tracking-tight line-clamp-6">{selectedMedia.overview}</p>
                  </div>
                </div>
              </div>

              {/* Interaction_Interface */}
              <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden relative">
                <div className="p-16 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-3xl z-10">
                  <div>
                    <h4 className="text-[12px] font-black text-white/30 uppercase tracking-[0.6em] flex items-center gap-4"><MessageSquare size={18} className="text-cyan-500" /> Neural_Community_Input</h4>
                    <p className="text-[10px] text-cyan-500/40 font-mono mt-3 tracking-[0.2em] italic animate-pulse">Establishing_Sync_Points... [ACTIVE]</p>
                  </div>
                  <div className="flex items-center gap-10">
                    <div className="h-16 w-[2px] bg-white/5" />
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-6xl font-black text-white tabular-nums tracking-tighter leading-none">{userAverage}</span>
                      <span className="text-[11px] font-bold text-cyan-500/30 uppercase tracking-[0.4em] leading-none">Collective_Avg</span>
                    </div>
                  </div>
                </div>

                {/* Neural_Feed_Scroll */}
                <div className="flex-1 overflow-y-auto p-20 space-y-12 no-scrollbar scroll-smooth">
                  {mediaReviews.length > 0 ? mediaReviews.map((rev, idx) => (
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: idx * 0.1 }} key={idx} className="bg-white/[0.01] border border-white/[0.04] p-12 rounded-[4rem] relative group hover:border-cyan-500/20 transition-all duration-1000">
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-6">
                          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                          <span className="text-[13px] font-black text-cyan-500 uppercase italic tracking-[0.3em]">UNIT_{rev.user_id?.slice(0, 12)}</span>
                        </div>
                        <div className="flex gap-2 bg-black/60 px-5 py-3 rounded-2xl border border-white/5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < rev.user_rating ? "fill-cyan-500 text-cyan-500" : "text-white/5"} />)}
                        </div>
                      </div>
                      <p className="text-white/70 text-[16px] leading-[1.8] italic font-medium border-l-[3px] border-cyan-500/10 pl-10">"{rev.review_text}"</p>
                      <div className="mt-10 flex justify-end gap-4 items-center opacity-20">
                        <div className="h-[1px] w-12 bg-white" />
                        <span className="text-[10px] text-white font-mono uppercase tracking-[0.4em]">{new Date(rev.created_at).toLocaleDateString()} // SYNC_SUCCESS</span>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="h-full flex flex-col items-center justify-center py-60 opacity-[0.05] gap-12">
                      <Activity size={120} strokeWidth={0.5} className="animate-pulse" />
                      <span className="text-[14px] font-black uppercase tracking-[1.2em] italic">Sector_In_Stasis</span>
                    </div>
                  )}
                </div>

                {/* Data_Injection_Console */}
                <div className="p-20 bg-slate-950/90 border-t border-white/5 backdrop-blur-4xl">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex flex-col gap-2">
                      <span className="text-[12px] font-black text-white/20 uppercase tracking-[0.5em]">Neural_Rating_Impact:</span>
                      <span className="text-[10px] text-cyan-500/20 uppercase font-mono italic tracking-widest">Scaling_Index: 1.0 TO 5.0</span>
                    </div>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button key={num} onClick={() => setRating(num)} className={`w-16 h-16 rounded-[1.5rem] border text-[18px] font-black transition-all duration-700 ${rating >= num ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_15px_40px_rgba(6,182,212,0.4)] scale-110' : 'bg-transparent border-white/5 text-slate-800 hover:border-white/20'}`}>{num}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <input value={review} onChange={(e) => setReview(e.target.value)} placeholder="Inject perception metadata into central node..." className="flex-1 bg-white/[0.02] border border-white/[0.06] px-12 py-8 rounded-[3rem] text-[16px] text-white outline-none focus:border-cyan-500/50 transition-all font-mono placeholder:text-slate-900" />
                    <button onClick={() => submitReview(selectedMedia.id)} className="bg-white text-black hover:bg-cyan-500 hover:text-white px-20 py-8 rounded-[3rem] text-[14px] font-black uppercase tracking-[0.5em] transition-all shadow-3xl active:scale-95 shadow-white/5 hover:shadow-cyan-600/20">Transmit</button>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setSelectedMedia(null)} className="absolute top-16 right-16 text-white/20 hover:text-white transition-all z-[110] bg-black/60 p-5 rounded-[2rem] border border-white/10 hover:border-cyan-500/50 hover:rotate-90 duration-500 shadow-2xl"><X size={40} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;