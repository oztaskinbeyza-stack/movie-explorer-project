/**
 * =========================================================================
 * NOVASTREAM NEURAL INTERFACE - CORE ARCHITECTURE v1.4.2
 * PROJECT: NovaStream Professional SaaS Simulation
 * THEME: Tech-Noir / Neural Cyan & Slate Deep Aesthetics
 * REVISION: Unabridged / Full Logic Synchronization
 * * * SYSTEM MODULES:
 * 1. ACCESS_CONTROL: Multi-Role Authentication (Admin, Staff, Unit)
 * 2. DATA_STREAM: Real-time TMDB Integration with Dynamic Pagination
 * 3. NEURAL_VAULT: Secure Supabase Watchlist & Interaction Sync
 * 4. UX_ENGINE: High-Performance Scroll Navigation & Framer Motion
 * 5. COMPLIANCE: Production-ready Build Standards (JSX Escaping)
 * =========================================================================
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
  Cpu, Zap, HardDrive, Bell, Settings, Filter, Clock
} from 'lucide-react';

// =========================================================================
// --- 1. COMPONENT: ADMIN_ROOT_TERMINAL (SYSTEM ANALYTICS) ---
// =========================================================================

const AdminDashboard = ({ stats, profile }) => {
  return (
    <div className="min-h-screen bg-[#020617] p-12 font-mono text-slate-300 selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto">
        {/* Terminal Header Architecture */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 border-b border-red-500/20 pb-16 gap-10">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-4 text-red-500 mb-6">
              <Terminal size={32} className="animate-pulse" />
              <span className="text-[12px] font-black uppercase tracking-[0.6em]">Protocol_ID: NOVA_ROOT_STATION</span>
            </div>
            <h2 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-2xl">
              Central_<span className="text-red-600">Admin</span>_Node
            </h2>
            <div className="flex items-center gap-10 mt-10">
              <div className="flex flex-col gap-1">
                <span className="text-slate-600 text-[9px] uppercase tracking-widest text-left">Active_Operator</span>
                <p className="text-slate-300 text-[11px] uppercase tracking-[0.4em]">{profile?.email}</p>
              </div>
              <div className="flex flex-col gap-1 border-l border-slate-800 pl-10">
                <span className="text-slate-600 text-[9px] uppercase tracking-widest text-left">Neural_Status</span>
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

        {/* Neural Metrics Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Registered_Units', value: stats.users, icon: <User size={40} />, color: 'bg-red-600' },
            { label: 'Neural_Injections', value: stats.reviews, icon: <MessageSquare size={40} />, color: 'bg-orange-600' },
            { label: 'Vault_Archive_Nodes', value: stats.watchlist, icon: <Database size={40} />, color: 'bg-amber-600' }
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
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 2, ease: "easeOut", delay: idx * 0.2 }} className={`h-full ${item.color} shadow-[0_0_20px_rgba(220,38,38,0.5)]`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Activity Stream - VERCEL BUILD FIX APPLIED */}
        <div className="mt-20 bg-slate-900/20 border border-slate-800/50 p-10 rounded-[3rem] font-mono text-xs opacity-60">
          <p className="text-red-500 uppercase font-black mb-4 tracking-widest italic">Live_System_Interface_Log:</p>
          <div className="space-y-3">
            <p className="text-cyan-400 uppercase">{" >> "} Identity_Handshake_Established... [OK]</p>
            <p className="text-slate-500 uppercase">{" >> "} Matrix_Allocation: 14.2GB / 64GB ... [STABLE]</p>
            <p className="text-slate-500 uppercase">{" >> "} Routing_NovaStream_Encryption_Table... [ACTIVE]</p>
            <p className="text-slate-500 uppercase">{" >> "} Memory_Checksum_Validation... [SUCCESS]</p>
            <p className="text-slate-500 uppercase">{" >> "} All_Systems_Verified_For_Alpha_Node... [READY]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// --- 2. COMPONENT: STAFF_DASHBOARD (MODERATION_HUB) ---
// =========================================================================

const StaffDashboard = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center p-10 font-mono">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 p-24 border border-blue-500/20 rounded-[5.5rem] w-full max-w-2xl text-center backdrop-blur-3xl shadow-[0_0_150px_rgba(37,99,235,0.1)] relative">
      <div className="w-32 h-32 bg-blue-500/10 rounded-[3.5rem] flex items-center justify-center text-blue-500 mx-auto mb-14 border border-blue-500/20 shadow-inner">
        <Activity size={64} className="animate-pulse" />
      </div>
      <h2 className="text-5xl font-black text-blue-500 mb-6 tracking-tighter uppercase italic leading-none">Staff_Sector</h2>
      <p className="text-slate-500 mb-16 text-[13px] font-medium uppercase tracking-[0.5em] leading-relaxed">Neural_Content_Moderation_Active <br /> <span className="text-blue-500/40">Protocol: Nova_Cipher_v4.2</span></p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[14px] transition-all shadow-2xl shadow-blue-600/40 active:scale-95">Disconnect_Secure_Link</button>
    </motion.div>
  </div>
);

// =========================================================================
// --- 3. COMPONENT: PROFILE_CORE_VIEW (IDENTITY_SYNC) ---
// =========================================================================

const ProfileView = ({ user, profile, watchlist }) => (
  <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-20 duration-1000">
    <div className="bg-slate-900 border border-slate-800 rounded-[6rem] p-24 mb-20 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
      <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[25rem] font-black italic text-cyan-500 leading-none">UNIT</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <div className="w-60 h-60 bg-gradient-to-br from-cyan-500 via-cyan-800 to-slate-950 rounded-[5rem] flex items-center justify-center text-7xl font-black text-white shadow-[0_40px_80px_rgba(6,182,212,0.4)] border-[6px] border-white/10">{profile?.email?.[0].toUpperCase() || 'U'}</div>
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.7em]">Neural_Unit_Verified</span>
          </div>
          <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white mb-8 leading-none drop-shadow-lg">{profile?.email?.split('@')[0]}</h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            <span className="bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 px-10 py-4 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.4em]">Unit_Clearance: {profile?.role || 'User'}</span>
            <span className="bg-slate-800/50 text-slate-400 border border-slate-700 px-10 py-4 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.4em]">Clearance_ID: NOVA-4-ALPHA</span>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
      {[
        { label: 'Synced_Objects', value: watchlist.length, unit: 'Nodes', desc: 'Securely stored items in vault' },
        { label: 'System_Uptime', value: '99.9%', unit: 'Signal', desc: 'Real-time database connectivity' },
        { label: 'Neural_Integrity', value: 'Prime', unit: 'Logic', desc: 'Data checksum validation' }
      ].map((stat, idx) => (
        <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 + (idx * 0.1) }} className="bg-slate-900/40 border border-slate-800 p-14 rounded-[4rem] hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-all" />
          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-8 group-hover:text-cyan-500 transition-colors">{stat.label}</h4>
          <div className="flex items-baseline justify-center md:justify-start gap-5 mb-6">
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
// --- 4. MASTER_APPLICATION_LOGIC (FULL_UNABRIDGED_ENGINE) ---
// =========================================================================

function App() {
  const { user, profile, loading: authLoading } = useAuth();
  
  // -- State Initialization --
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

  // -- Master Utility Engine --
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  }, []);

const fetchMedia = async (query = '', isNextPage = false) => {
    if (!API_KEY) return;
    setLoading(true);
    const currentPage = isNextPage ? page + 1 : 1;
    
    let endpoint = query 
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${currentPage}&include_adult=false`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}&include_adult=false`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("API_REJECTION");
      const data = await response.json();
      
      const validResults = (data.results || []).filter(movie => movie.adult === false);
      
      setMediaList(prev => isNextPage ? [...prev, ...validResults] : validResults);
      setPage(currentPage);
    } catch (error) {
      if (!isNextPage) setMediaList(fallbackMedia);
      showToast("Data_Stream_Interrupted_Core_Offline", "error");
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();
      const trailer = data.results?.find(vid => vid.type === "Trailer" && vid.site === "YouTube");
      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) { setTrailerKey(null); }
  };

  const fetchWatchlist = useCallback(async () => {
    const { data, error } = await supabase.from('watchlists').select('*').order('created_at', { ascending: false });
    if (!error) setWatchlist(data || []);
  }, []);

  const fetchReviews = async (mediaId) => {
    if (!mediaId) return;
    const { data, error } = await supabase.from('reviews').select('*').eq('media_id', String(mediaId)).order('created_at', { ascending: false });
    if (!error) setMediaReviews(data || []);
  };

  const fetchStats = useCallback(async () => {
    const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: r } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
    const { count: w } = await supabase.from('watchlists').select('*', { count: 'exact', head: true });
    setStats({ users: u || 0, reviews: r || 0, watchlist: w || 0 });
  }, []);

  // -- Interaction Logic Module --
  const submitReview = async (mediaId) => {
    if (!review || !user) return;
    const { error } = await supabase.from('reviews').insert([{ media_id: String(mediaId), review_text: review, user_rating: rating, user_id: user.id }]);
    if (!error) { setReview(''); await fetchReviews(mediaId); showToast('Neural_Perception_Injection_Successful'); }
  };

  const addToWatchlist = async (mediaItem) => {
    const isDuplicate = watchlist.some(item => String(item.media_id) === String(mediaItem.id));
    if (isDuplicate) return showToast('Object_Already_Identified_In_Vault', 'error');
    const { error } = await supabase.from('watchlists').insert([{ 
      media_id: mediaItem.id, title: mediaItem.title, poster_path: mediaItem.poster_path, 
      vote_average: mediaItem.vote_average, user_id: user?.id, status: 'to_watch'
    }]);
    if (!error) { fetchWatchlist(); showToast('Object_Synced_With_Vault'); }
  };

  const removeFromWatchlist = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) { fetchWatchlist(); showToast('Object_Purged_From_Registry', 'error'); }
  };

  const toggleWatchlistStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'to_watch' ? 'completed' : 'to_watch';
    const { error } = await supabase.from('watchlists').update({ status: newStatus }).eq('id', id);
    if (!error) fetchWatchlist();
  };

  // --- 5. SYSTEM_LIFECYCLE_&_AUTOMATION ---
  useEffect(() => { fetchMedia(searchQuery); }, [searchQuery]);
  useEffect(() => { if (user) { fetchWatchlist(); if (profile?.role === 'Admin') fetchStats(); } }, [user, profile, fetchWatchlist, fetchStats]);
  useEffect(() => { if (selectedMedia) { fetchReviews(selectedMedia.id); fetchTrailer(selectedMedia.id); } }, [selectedMedia]);

  // Automated Intersection Discovery Engine
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && view === 'browse') fetchMedia(searchQuery, true);
    }, { threshold: 0.1, rootMargin: '600px' });
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

  // --- 6. AUTHENTICATION_GATEWAY ---
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Dynamic Animated Background Grid Architecture */}
        <div className="absolute inset-0 z-0 flex gap-8 opacity-[0.05] pointer-events-none skew-y-12 scale-150">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
            <div key={col} className="flex-1 flex flex-col gap-8 animate-infinite-scroll">
              {[...mediaList, ...mediaList, ...mediaList].slice(0, 40).map((movie, idx) => (
                <img key={idx} src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : 'https://via.placeholder.com/400x600'} className="w-full rounded-[3rem] grayscale brightness-50 shadow-2xl" alt="" />
              ))}
            </div>
          ))}
        </div>

        {/* Security Login Card Structure */}
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative z-10 bg-slate-900/90 p-20 rounded-[6rem] border border-slate-800/60 w-full max-w-lg shadow-[0_0_200px_rgba(6,182,212,0.1)] backdrop-blur-4xl text-center">
          <div className="mb-20">
            <h2 className="text-8xl font-black tracking-tighter italic uppercase mb-4 text-white leading-none">Nova<span className="text-cyan-500">Stream</span></h2>
            <div className="flex items-center justify-center gap-5">
              <div className="h-[2px] w-12 bg-slate-800" />
              <p className="text-slate-500 text-[12px] font-black tracking-[0.6em] uppercase">Neural_Core_v1.4.2</p>
              <div className="h-[2px] w-12 bg-slate-800" />
            </div>
          </div>
          <div className="space-y-8 text-left">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-700 tracking-[0.4em] ml-6">Node_Identifier</label>
              <input type="email" placeholder="root@novastream.sys" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-8 rounded-[2.5rem] text-white outline-none font-mono text-xs focus:border-cyan-500 transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-700 tracking-[0.4em] ml-6">Encrypted_Passkey</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-8 rounded-[2.5rem] text-white outline-none font-mono text-xs focus:border-cyan-500 transition-all" />
            </div>
            <button onClick={async () => { const {error} = await supabase.auth.signInWithPassword({email, password}); if(error) showToast("Identity_Check_Rejected", "error"); }} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-3xl shadow-cyan-600/30 transition-all active:scale-95 mt-6">Establish_Session</button>
            <button onClick={async () => { const {error} = await supabase.auth.signUp({email, password}); if(error) showToast(error.message, "error"); }} className="w-full bg-transparent hover:bg-slate-800/50 text-slate-700 py-5 rounded-[2.5rem] font-black uppercase text-[11px] border border-slate-800/50 transition-all tracking-[0.1em]">Request_Node_Allocation</button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- 8. DASHBOARD_ROUTING_MODULE ---
  if (profile?.role === 'Admin') return <AdminDashboard stats={stats} profile={profile} />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  // --- 9. PRIMARY_UNIT_INTERFACE ---
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* Toast Notification System */}
      <AnimatePresence>
        {toast.message && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed bottom-12 right-12 z-[400] px-12 py-7 rounded-[2.5rem] border backdrop-blur-3xl shadow-3xl flex items-center gap-8 bg-cyan-500/10 border-cyan-500/20 text-cyan-400">
            <div className={`w-3 h-3 rounded-full animate-ping bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]`} />
            <span className="text-[12px] font-black uppercase tracking-[0.4em] font-mono">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Premium System Navigation */}
      <nav className="px-16 py-12 flex justify-between items-center border-b border-slate-900 bg-slate-950/80 backdrop-blur-3xl sticky top-0 z-[100]">
        <div className="flex items-center gap-20">
          <h1 className="text-5xl font-black italic tracking-tighter leading-none hover:scale-110 transition-all cursor-pointer group" onClick={() => setView('browse')}>Nova<span className="text-cyan-500 group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all">Stream</span></h1>
          <div className="relative group hidden xl:block">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-800" size={20} />
            <input type="text" placeholder="Inject_Query_to_Database..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-900/50 border border-slate-800/80 pl-16 pr-10 py-5 rounded-[2rem] text-[13px] outline-none focus:border-cyan-500 w-[450px] transition-all font-mono text-slate-300 placeholder:text-slate-900" />
          </div>
        </div>
        <div className="flex items-center gap-14 text-[12px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono">
          <button onClick={() => setView('browse')} className={`hover:text-white flex items-center gap-4 transition-all ${view === 'browse' ? 'text-cyan-500' : ''}`}><LayoutGrid size={20} /> Browse</button>
          <button onClick={() => setView('watchlist')} className={`hover:text-white flex items-center gap-4 transition-all ${view === 'watchlist' ? 'text-cyan-500' : ''}`}><Bookmark size={20} /> Watchlist ({watchlist.length})</button>
          <button onClick={() => setView('profile')} className={`hover:text-white flex items-center gap-4 transition-all ${view === 'profile' ? 'text-cyan-500' : ''}`}><User size={20} /> Profile</button>
          <div className="h-12 w-[1px] bg-slate-900 mx-4" />
          <button onClick={() => supabase.auth.signOut()} className="bg-slate-900 hover:bg-red-500/10 p-4.5 rounded-[1.5rem] border border-slate-800 text-slate-600 hover:text-red-500 transition-all"><LogOut size={22} /></button>
        </div>
      </nav>

      <main className="p-16 max-w-[1900px] mx-auto">
        {view === 'browse' ? (
          <div className="space-y-40 animate-in fade-in duration-1000 pb-20 overflow-hidden">
            
            {/* ROW_ARCHITECTURE MODULES */}
            {[
              { 
                title: "Resume_Neural_Stream", 
                data: watchlist.slice(0, 8), 
                icon: <Clock className="text-cyan-500 animate-pulse" size={24} />,
                type: 'resume',
                condition: watchlist.length > 0
              },
              { 
                title: "Trending_Neural_Signals", 
                data: mediaList.slice(0, 15), 
                icon: <Activity className="text-white/30" size={24} />,
                type: 'row',
                condition: true
              },
              { 
                title: "High_Impact_Archive_Nodes", 
                data: mediaList.filter(m => m.vote_average > 7.4), 
                icon: <Zap className="text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" size={24} />,
                type: 'row',
                condition: true
              }
            ].map((section, idx) => section.condition && (
              <section key={idx} className="relative px-6 group/row">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex flex-col">
                      <div className="flex items-center gap-6 mb-3">
                        {section.icon}
                        <h3 className="text-lg font-semibold tracking-tight text-white/90 uppercase italic leading-none">{section.title.replace(/_/g, ' ')}</h3>
                      </div>
                      <div className="h-[2px] w-12 bg-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover/row:w-full transition-all duration-700" />
                   </div>
                   {/* ROW_NAVIGATION ENGINE (WORKING_FIX) */}
                   <div className="flex gap-4 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0 duration-500">
                     <button onClick={(e) => { e.currentTarget.closest('section').querySelector('.row-scroll').scrollBy({ left: -1000, behavior: 'smooth' }); }} className="p-5 bg-black/90 border border-white/10 rounded-2xl text-white hover:bg-cyan-600 transition-all shadow-3xl z-50"><ChevronLeft size={28} /></button>
                     <button onClick={(e) => { e.currentTarget.closest('section').querySelector('.row-scroll').scrollBy({ left: 1000, behavior: 'smooth' }); }} className="p-5 bg-black/90 border border-white/10 rounded-2xl text-white hover:bg-cyan-600 transition-all shadow-3xl z-50"><ChevronRight size={28} /></button>
                   </div>
                </div>

                <div className="row-scroll flex flex-nowrap gap-16 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-12 px-4 relative z-10">
                  {section.data.map((movie) => (
                    <div key={movie.id} className="snap-start shrink-0 relative group">
                       <MovieCard movie={section.type === 'resume' ? {...movie, id: movie.media_id} : movie} onSelect={setSelectedMedia} onAdd={addToWatchlist} />
                       {section.type === 'resume' && <div className="absolute bottom-0 left-0 h-1.5 bg-cyan-600 w-3/4 shadow-[0_0_15px_rgba(6,182,212,1)] rounded-full z-[60] animate-pulse" />}
                    </div>
                  ))}
                </div>
              </section>
            ))}

{/* DEEP_DATABASE_EXPLORATION GRID Architecture */}
<section className="px-6 mt-10">
  <div className="flex items-center gap-4 mb-10 group/head cursor-default">
    <div className="h-6 w-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
    <h3 className="text-xl font-semibold tracking-tight text-white/90 transition-colors group-hover/head:text-cyan-400">
      Deep Global Exploration
    </h3>
  </div>
  
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-12 place-items-center">
    {mediaList.slice(15).map((movie) => (
      <div key={movie.id} className="transition-transform duration-700 hover:z-50 hover:-translate-y-2">
        <MovieCard movie={movie} onSelect={setSelectedMedia} onAdd={addToWatchlist} />
      </div>
    ))}
  </div>
</section>
            
            {/* SENTRY_DISCOVERY LOADER Architecture */}
            <div ref={loaderRef} className="h-80 flex flex-col items-center justify-center gap-12 opacity-30">
              <div className="flex gap-8">
                <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping" />
                <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping [animation-delay:0.3s]" />
                <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping [animation-delay:0.6s]" />
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="text-[12px] font-black uppercase tracking-[1.8em] text-cyan-500 italic">Expanding_Neural_Sector</span>
                <span className="text-slate-800 text-[10px] uppercase font-mono tracking-widest leading-none">Protocol: Continuous_Fetch_Active</span>
              </div>
            </div>
          </div>
        ) : view === 'watchlist' ? (
          <div className="px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex items-center gap-12 mb-24">
              <h3 className="text-7xl font-black italic uppercase tracking-tighter text-white leading-none">Identifier_Vault</h3>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-900 via-slate-800 to-transparent" />
            </div>
            {watchlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-16">
                {watchlist.map((item) => (
                  <div key={item.id} className="relative group bg-slate-900/40 rounded-[3rem] overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all shadow-3xl">
                    <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750'} className="w-full aspect-[2/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-[1.1] group-hover:scale-100" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-95" />
                    <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover:opacity-100 translate-x-8 group-hover:translate-x-0 transition-all duration-700">
                      <button onClick={() => removeFromWatchlist(item.id)} className="bg-red-600 p-6 rounded-[1.8rem] text-white shadow-3xl hover:bg-red-500 transition-all"><X size={28} /></button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-10">
                      <p className="text-[14px] font-black uppercase text-white truncate italic tracking-tighter leading-none">{item.title}</p>
                      <div className="flex items-center gap-4 mt-5">
                        <Star size={14} className="fill-cyan-500 text-cyan-500" />
                        <span className="text-[12px] font-mono text-slate-500">{item.vote_average?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-80 opacity-[0.05] gap-20">
                <Database size={240} strokeWidth={0.3} className="text-white" />
                <h4 className="text-6xl font-black uppercase tracking-[1em] italic">Vault_Empty</h4>
              </div>
            )}
          </div>
        ) : <ProfileView user={user} profile={profile} watchlist={watchlist} />}
      </main>

{/* --- NEURAL_INTERACTION_MODAL: ELITE UI FIX --- */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 md:p-12 z-[300] backdrop-blur-3xl" onClick={() => setSelectedMedia(null)}>
            <motion.div initial={{ scale: 0.95, y: 40 }} animate={{ scale: 1, y: 0 }} className="bg-[#050505] border border-white/10 max-w-[1400px] w-full flex flex-col lg:flex-row rounded-[3rem] overflow-hidden h-full max-h-[85vh] shadow-[0_0_100px_rgba(6,182,212,0.15)] relative" onClick={e => e.stopPropagation()}>
              
              <div className="w-full lg:w-[55%] relative bg-black flex flex-col border-r border-white/5 overflow-hidden">
                <div className="flex-1 bg-black flex items-center justify-center relative group/player overflow-hidden min-h-[300px]">
                  {trailerKey ? (
                    <iframe src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0`} className="w-full h-full border-0 z-10" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                  ) : (
                    <div className="text-center p-12 opacity-20 flex flex-col items-center gap-6">
                      <Database size={80} strokeWidth={0.5} className="text-cyan-500" />
                      <span className="text-[11px] font-black uppercase tracking-[0.8em] text-cyan-500">Signal_Offline</span>
                    </div>
                  )}
                </div>
                
                <div className="p-10 md:p-14 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <div className="flex items-center gap-6 mb-6 font-mono text-[10px] font-bold uppercase">
                    <div className="bg-cyan-600 text-white px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-2">
                      <Star size={14} fill="white" /> 
                      <span>SCORE_{selectedMedia.vote_average?.toFixed(1)}</span>
                    </div>
                    <span className="text-slate-400 flex items-center gap-2"><Calendar size={16}/> {selectedMedia.release_date?.split('-')[0]}</span>
                    <span className="text-slate-400 border-l border-white/10 pl-6 flex items-center gap-2"><Globe size={16}/> {selectedMedia.original_language?.toUpperCase()}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase text-white tracking-tight leading-[1.1]">{selectedMedia.title}</h2>
                  
                  <p className="text-white/70 text-[14px] leading-relaxed font-medium line-clamp-3 border-l-4 border-cyan-600/30 pl-6">{selectedMedia.overview}</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
                <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-2xl z-10 shadow-xl">
                   <div className="flex flex-col gap-1">
                      <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] flex items-center gap-3"><MessageSquare size={16} className="text-cyan-500" /> Neural_Feed</h4>
                      <p className="text-[9px] text-cyan-500/50 font-mono tracking-widest animate-pulse mt-1">Establishing_Sync...</p>
                   </div>
                   <div className="text-right flex items-center gap-6">
                      <div className="h-10 w-[1px] bg-white/10" />
                      <div className="flex flex-col">
                        <span className="text-4xl font-black text-white tabular-nums leading-none tracking-tighter">{userAverage}</span>
                        <span className="text-[9px] font-bold text-cyan-500/40 uppercase tracking-[0.3em] mt-1">Global_Avg</span>
                      </div>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-6 no-scrollbar scroll-smooth">
                  {mediaReviews.length > 0 ? mediaReviews.map((rev, idx) => (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-[2rem] group hover:border-cyan-500/30 transition-all duration-500">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em]">UNIT_{rev.user_id?.slice(0, 8)}</span>
                        <div className="flex gap-1 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < rev.user_rating ? "fill-cyan-500 text-cyan-500" : "text-white/10"} />)}
                        </div>
                      </div>
                      <p className="text-white/80 text-[14px] leading-relaxed font-medium">"{rev.review_text}"</p>
                    </motion.div>
                  )) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 gap-6">
                      <Activity size={60} strokeWidth={1} className="animate-pulse text-cyan-500" />
                      <span className="text-xs font-black uppercase tracking-[0.5em]">No_Signals_Logged</span>
                    </div>
                  )}
                </div>

                <div className="p-8 md:p-10 bg-slate-950/95 border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Assign_Impact:</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button key={n} onClick={() => setRating(n)} className={`w-10 h-10 rounded-xl border text-[14px] font-black transition-all duration-300 ${rating >= n ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105' : 'bg-transparent border-white/10 text-slate-500 hover:border-white/30 hover:text-white'}`}>{n}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <input value={review} onChange={(e) => setReview(e.target.value)} placeholder="Inject perception data..." className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 rounded-[1.5rem] text-[13px] text-white outline-none focus:border-cyan-500/50 transition-all font-mono placeholder:text-slate-500" />
                    <button onClick={() => submitReview(selectedMedia.id)} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-95">Transmit</button>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setSelectedMedia(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-all z-[110] bg-black/80 p-3 rounded-full border border-white/10 hover:bg-cyan-600 hover:border-cyan-500 hover:rotate-90 duration-300"><X size={24} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
    </div>
  );
}

export default App;