import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { useAuth } from './AuthContext';

import MovieCard from './MovieCard';
import ProfilePage from './ProfilePage';
import { getSophisticatedRecommendations } from './recommendation_logic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Play, Plus, Check, X, Shield, Activity,
  Database, LogOut, Search, User, LayoutGrid,
  Bookmark, ChevronLeft, ChevronRight, Calendar,
  Globe, Info, MessageSquare, Award, Terminal,
  Cpu, Zap, HardDrive, Bell, Settings, Filter, Clock,
  Ghost, Laugh, Tv, Film, Eye, ShieldAlert, ZapOff,
  Flame, TrendingUp, BarChart3, Layers, MonitorPlay,
  Clapperboard, Home as HomeIcon, Trophy, Compass,
  Sword, Heart, Skull, BookOpen, CheckCircle
} from 'lucide-react';

// =========================================================================
// --- 1. COMPONENT: ADMIN_ROOT_STATION (Full Detailed English UI) ---
// =========================================================================

const AdminDashboard = ({ stats, profile }) => {
  return (
    <div className="min-h-screen bg-[#020617] p-12 font-mono text-slate-300 selection:bg-red-500/30">
      <div className="max-w-7xl mx-auto">
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
                <p className="text-slate-300 text-[11px] uppercase tracking-[0.4em]">{profile?.email || profile?.full_name}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total_Agents', value: stats.users, icon: <User size={20} />, color: 'bg-cyan-500' },
            { label: 'Data_Injections', value: stats.reviews, icon: <MessageSquare size={20} />, color: 'bg-purple-500' },
            { label: 'Archive_Size', value: stats.watchlist, icon: <Bookmark size={20} />, color: 'bg-orange-500' },
            { label: 'System_Load', value: '42.8%', icon: <Activity size={20} />, color: 'bg-emerald-500' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                {item.icon}
              </div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{item.label}</p>
              <p className="text-4xl font-black text-white tabular-nums mb-6">{item.value}</p>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} style={{ width: '65%' }}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ADMIN TOOLS: Review Moderation & Content Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <Shield size={20} className="text-red-500" /> Moderation Queue
            </h3>
            <p className="text-slate-500 text-sm mb-6 font-medium">Flagged review data awaiting administrative intervention.</p>
            <div className="space-y-4">
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-xs">Review #1284 - Violation Detected</p>
                  <p className="text-slate-500 text-[10px]">User: Agent_8842 - Status: Flagged</p>
                </div>
                <button className="px-4 py-2 bg-red-600/20 text-red-400 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Remove</button>
              </div>
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-xs">Review #1291 - Spam Protocol</p>
                  <p className="text-slate-500 text-[10px]">User: Guest_4492 - Status: Restricted</p>
                </div>
                <button className="px-4 py-2 bg-red-600/20 text-red-400 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Remove</button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <BarChart3 size={20} className="text-cyan-500" /> Genre Analytics
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest"><span>Sci-Fi / Action</span><span>82%</span></div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]" style={{ width: '82%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest"><span>Documentary</span><span>44%</span></div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]" style={{ width: '44%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest"><span>Horror / Mystery</span><span>65%</span></div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]" style={{ width: '65%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// --- 2. COMPONENTS: STAFF & PROFILE (Full Detail) ---
// =========================================================================

const StaffDashboard = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center p-10 font-mono">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 p-24 border border-blue-500/20 rounded-[5.5rem] w-full max-w-2xl text-center backdrop-blur-3xl shadow-2xl">
      <div className="w-32 h-32 bg-blue-500/10 rounded-[3.5rem] flex items-center justify-center text-blue-500 mx-auto mb-14 border border-blue-500/20 shadow-inner">
        <Activity size={64} className="animate-pulse" />
      </div>
      <h2 className="text-5xl font-black text-blue-500 mb-6 tracking-tighter uppercase italic">Staff_Sector</h2>
      <p className="text-slate-500 mb-16 text-[13px] font-medium uppercase tracking-[0.5em]">Neural_Content_Moderation_Active</p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] transition-all active:scale-95 shadow-2xl">Disconnect_Link</button>
    </motion.div>
  </div>
);

// ProfileView is now in ProfilePage.jsx

// =========================================================================
// --- 3. MASTER_APPLICATION_LOGIC (FULL ENGLISH) ---
// =========================================================================

const HeroCarousel = ({ movies, onSelect, onAdd, watchlist }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % Math.min(movies.length, 5));
    }, 8000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[activeIdx] || movies[0];
  const isInWatchlist = watchlist.some(w => String(w.media_id) === String(currentMovie.id));

  return (
    <div className="relative w-full h-[60vh] md:h-[75vh] max-h-[850px] min-h-[500px] overflow-hidden rounded-3xl mb-16 group select-none shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/5">
      {/* BACKGROUND IMAGE WITH CINEMATIC GLOW */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path || currentMovie.poster_path}`}
            className="w-full h-full object-cover"
            alt={currentMovie.title || currentMovie.name}
          />
          {/* CINEMATIC OVERLAYS FOR OPTIMAL CONTRAST */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/70 to-transparent w-full md:w-3/4 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENT DETAILS */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* BADGE: Prime Video Style */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-cyan-900/50 rounded-full text-cyan-400 font-bold text-xs border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <TrendingUp size={14} className="text-cyan-400 animate-bounce" /> #1 Top Trending Content
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 bg-yellow-900/50 rounded-full text-yellow-400 font-bold text-xs border border-yellow-500/30">
                <Star size={12} className="fill-yellow-400 text-yellow-400" /> {currentMovie.vote_average ? currentMovie.vote_average.toFixed(1) : '8.5'}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-2xl font-serif">
              {currentMovie.title || currentMovie.name}
            </h1>

            {/* OVERVIEW */}
            <p className="text-sm md:text-base text-slate-300 line-clamp-3 leading-relaxed max-w-2xl drop-shadow">
              {currentMovie.overview || "In a world of constant chaos and epic adventures, one story rises above all. Experience the visual spectacle that has captured audiences worldwide."}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => onSelect(currentMovie)}
                className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-cyan-400 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_10px_30px_rgba(6,182,212,0.5)]"
              >
                <Play size={18} className="fill-slate-950" /> Watch Now
              </button>

              <button
                onClick={() => onAdd(currentMovie)}
                className={`flex items-center justify-center w-14 h-14 rounded-2xl border transition-all duration-300 hover:scale-105 ${isInWatchlist ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'bg-black/40 hover:bg-black/60 border-white/20 text-white'}`}
                title={isInWatchlist ? "Already in Watchlist" : "Add to Watchlist"}
              >
                {isInWatchlist ? <Check size={24} /> : <Plus size={24} />}
              </button>

              <button
                onClick={() => onSelect(currentMovie)}
                className="flex items-center justify-center w-14 h-14 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 text-white transition-all duration-300 hover:scale-105"
                title="More Info"
              >
                <Info size={24} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ARROW CONTROLS */}
      <button
        onClick={() => setActiveIdx(prev => (prev - 1 + Math.min(movies.length, 5)) % Math.min(movies.length, 5))}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => setActiveIdx(prev => (prev + 1) % Math.min(movies.length, 5))}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* SLIDER DOTS */}
      <div className="absolute bottom-6 right-12 z-30 flex items-center gap-2">
        {movies.slice(0, 5).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIdx ? 'w-8 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.9)]' : 'w-2 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  const { user, profile, loading: authLoading } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('browse');
  const [mainTab, setMainTab] = useState('home'); // home, movie, tv, sports, doc
  const [activeSub, setActiveSub] = useState('all');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [review, setReview] = useState('');
  const [mediaReviews, setMediaReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [toast, setToast] = useState({ message: '', type: null });
  const [replyTo, setReplyTo] = useState(null); // reviewId being replied to
  const [replyText, setReplyText] = useState('');
  const [localVotes, setLocalVotes] = useState({}); // { reviewId: { up: bool, count: number } }
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profileInitialTab, setProfileInitialTab] = useState('overview');
  const [stats, setStats] = useState({ users: 0, reviews: 0, watchlist: 0 });
  const [trailerKey, setTrailerKey] = useState(null);
  const [tmdbReviews, setTmdbReviews] = useState([]);
  const [mediaDetail, setMediaDetail] = useState(null);
  const [footerModal, setFooterModal] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // --- CONTENT STATES ---
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [action, setAction] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [horror, setHorror] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [documentary, setDocumentary] = useState([]);
  const [drama, setDrama] = useState([]);
  const [mystery, setMystery] = useState([]);
  const [sports, setSports] = useState([]);
  const [actionTV, setActionTV] = useState([]);
  const [scifiTV, setScifiTV] = useState([]);
  const [horrorTV, setHorrorTV] = useState([]);
  const [comedyTV, setComedyTV] = useState([]);
  const [dramaTV, setDramaTV] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [tmdbError, setTmdbError] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  }, []);

  const fetchMedia = async (endpoint, pages = 3) => {
    if (!API_KEY) return [];
    try {
      let allResults = [];
      const blacklist = ['porn', 'sex', 'erotic', 'adult', 'xxx', 'nudity', 'strip', 'prostitute', 'escort', 'hentai'];

      for (let i = 1; i <= pages; i++) {
        const fullUrl = `${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=en-US&include_adult=false&page=${i}`;
        const res = await fetch(fullUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allResults = [...allResults, ...(data.results || [])];
      }
      // Remove duplicates that often occur across TMDB API pages
      const uniqueResults = [];
      const seenIds = new Set();
      for (const item of allResults) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          uniqueResults.push(item);
        }
      }

      return uniqueResults.filter(m => {
        const title = (m.title || m.name || "").toLowerCase();
        const overview = (m.overview || "").toLowerCase();
        const hasBadWord = blacklist.some(word => title.includes(word) || overview.includes(word));
        return m.adult !== true && !hasBadWord && m.poster_path; // Only keep ones with posters
      });
    } catch (error) {
      setTmdbError(true);
      return [];
    }
  };

  useEffect(() => {
    const loadAllContent = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const [t, p, tr, u, a, sf, h, c, an, d, dr, m, ttv, trtv, ptv, sp, atv, sftv, htv, ctv, drtv] = await Promise.all([
          fetchMedia(`https://api.themoviedb.org/3/trending/movie/week`),
          fetchMedia(`https://api.themoviedb.org/3/movie/popular`),
          fetchMedia(`https://api.themoviedb.org/3/movie/top_rated`),
          fetchMedia(`https://api.themoviedb.org/3/movie/upcoming`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=28`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=878`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=27`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=35`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=16`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=99`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=18`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=9648`),
          fetchMedia(`https://api.themoviedb.org/3/trending/tv/week`),
          fetchMedia(`https://api.themoviedb.org/3/tv/top_rated`),
          fetchMedia(`https://api.themoviedb.org/3/tv/popular`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_keywords=6075`),
          fetchMedia(`https://api.themoviedb.org/3/discover/tv?with_genres=10759`), // Action TV
          fetchMedia(`https://api.themoviedb.org/3/discover/tv?with_genres=10765`), // Sci-Fi TV
          fetchMedia(`https://api.themoviedb.org/3/discover/tv?with_genres=9648`), // Mystery/Thriller TV
          fetchMedia(`https://api.themoviedb.org/3/discover/tv?with_genres=35`), // Comedy TV
          fetchMedia(`https://api.themoviedb.org/3/discover/tv?with_genres=18`) // Drama TV
        ]);
        setTrending(t); setPopular(p); setTopRated(tr); setUpcoming(u);
        setAction(a); setScifi(sf); setHorror(h); setComedy(c);
        setAnimation(an); setDocumentary(d); setDrama(dr); setMystery(m);
        setTrendingTV(ttv); setTopRatedTV(trtv); setPopularTV(ptv); setSports(sp);
        setActionTV(atv); setScifiTV(sftv); setHorrorTV(htv); setComedyTV(ctv); setDramaTV(drtv);
        if (profile?.role === 'Admin') fetchStats();
      } catch (err) { showToast("Network connection error", "error"); } finally { setLoading(false); }
    };
    loadAllContent();
  }, [user, profile]);

  // --- DYNAMIC NOTIFICATION ENGINE ---
  useEffect(() => {
    if (upcoming.length === 0 || trendingTV.length === 0 || popular.length === 0) return;

    // 1. Initial State Setup
    setNotifications(prev => {
      if (prev.length > 0) return prev;
      const initial = [
        { id: Date.now() + 1, type: 'new', title: 'New Movie Released', message: `"${upcoming[0]?.title || upcoming[0]?.name}" is now available in Ultra HD. Watch it before anyone else.`, time: 'Just now', read: false },
        { id: Date.now() + 2, type: 'new_tv', title: 'Trending Series', message: `Episode 1 of "${trendingTV[0]?.name || trendingTV[0]?.title}" is breaking records globally!`, time: '2 hours ago', read: false }
      ];
      if (watchlist.length > 0) {
        const lastAdded = watchlist[watchlist.length - 1] || watchlist[0];
        const rec = popular.find(p => !watchlist.some(w => w.id === p.id)) || popular[0];
        initial.push({
          id: Date.now() + 3,
          type: 'recommendation',
          title: `Because you added "${lastAdded.title || lastAdded.name}"`,
          message: `You might also enjoy "${rec.title || rec.name}". Add it to your Watchlist!`,
          time: '5 hours ago',
          read: false
        });
      }
      initial.push({ id: Date.now() + 4, type: 'system', title: 'System Updated', message: 'NovaStream v2.0 is active. Enjoy the new professional interface and extended cinematic library.', time: '1 day ago', read: true });
      return initial;
    });

    // 2. Periodic Live Notifications (Every 25 seconds)
    const interval = setInterval(() => {
      setNotifications(prev => {
        if (prev.length > 25) return prev; // Limit max notifications

        const randomGen = Math.random();
        let newNotif = null;

        if (randomGen > 0.6 && watchlist.length > 0) {
          const watchItem = watchlist[Math.floor(Math.random() * watchlist.length)];
          const rec = popular[Math.floor(Math.random() * popular.length)];
          newNotif = {
            id: Date.now(),
            type: 'recommendation',
            title: 'Personalized Pick For You',
            message: `Since you love "${watchItem.title || watchItem.name}", we think you'll definitely enjoy "${rec.title || rec.name}".`,
            time: 'Just now',
            read: false
          };
        } else if (randomGen > 0.3) {
          const trend = trendingTV[Math.floor(Math.random() * trendingTV.length)];
          newNotif = {
            id: Date.now(),
            type: 'new_tv',
            title: 'Currently Trending',
            message: `"${trend.title || trend.name}" has just entered the Top 10 globally. Check it out now!`,
            time: 'Just now',
            read: false
          };
        } else {
          const upc = upcoming[Math.floor(Math.random() * upcoming.length)];
          newNotif = {
            id: Date.now(),
            type: 'new',
            title: 'Hot Release',
            message: `"${upc.title || upc.name}" is getting incredible reviews from our community.`,
            time: 'Just now',
            read: false
          };
        }

        return [newNotif, ...prev];
      });
    }, 25000);

    return () => clearInterval(interval);
  }, [upcoming, trendingTV, popular, watchlist]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery) {
        const results = await fetchMedia(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(searchQuery)}`);
        setSearchResults(results);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchTrailer = async (media) => {
    const type = media.media_type || (media.title ? 'movie' : 'tv');
    try {
      let res = await fetch(`https://api.themoviedb.org/3/${type}/${media.id}/videos?api_key=${API_KEY}&language=en-US`);
      let data = await res.json();

      if (!data.results || data.results.length === 0) {
        res = await fetch(`https://api.themoviedb.org/3/${type}/${media.id}/videos?api_key=${API_KEY}`);
        data = await res.json();
      }

      const vids = data.results?.filter(vid => vid.site === "YouTube") || [];
      const trailer = vids.find(vid => vid.type === "Trailer") || vids.find(vid => vid.type === "Teaser") || vids[0];
      setTrailerKey(trailer ? trailer.key : null);
    } catch { setTrailerKey(null); }
  };

  const fetchTMDBReviews = async (media) => {
    if (!API_KEY || !media?.id) return;
    const type = media.media_type || (media.title ? 'movie' : 'tv');
    try {
      let res = await fetch(`https://api.themoviedb.org/3/${type}/${media.id}/reviews?api_key=${API_KEY}&language=en-US`);
      let data = await res.json();

      if (!data.results || data.results.length === 0) {
        res = await fetch(`https://api.themoviedb.org/3/${type}/${media.id}/reviews?api_key=${API_KEY}`);
        data = await res.json();
      }

      setTmdbReviews((data.results || []).slice(0, 10));
    } catch { setTmdbReviews([]); }
  };

  const fetchMediaDetail = async (media) => {
    if (!API_KEY || !media?.id) return;
    const type = media.media_type || (media.title ? 'movie' : 'tv');
    try {
      let res = await fetch(`https://api.themoviedb.org/3/${type}/${media.id}?api_key=${API_KEY}&language=en-US`);
      let data = await res.json();

      if (!data.overview) {
        res = await fetch(`https://api.themoviedb.org/3/${type}/${media.id}?api_key=${API_KEY}`);
        const fallbackData = await res.json();
        // Merge fallback data to keep any english fields that were present
        data = { ...data, overview: fallbackData.overview, genres: fallbackData.genres || data.genres };
      }
      setMediaDetail(data);
    } catch { setMediaDetail(null); }
  };

  const fetchWatchlist = useCallback(async () => {
    const { data, error } = await supabase.from('watchlists').select('*').order('created_at', { ascending: false });
    if (!error) setWatchlist(data || []);
  }, []);

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user, fetchWatchlist]);

  const fetchReviews = async (mediaId) => {
    if (!mediaId) return;
    const { data } = await supabase.from('reviews').select('*').eq('media_id', String(mediaId)).order('created_at', { ascending: false });
    if (!data) { setMediaReviews([]); return; }
    // Enrich with profile usernames
    const enriched = await Promise.all(data.map(async (rev) => {
      const { data: prof } = await supabase.from('profiles').select('username, full_name').eq('id', rev.user_id).single();
      return { ...rev, _username: prof?.username || prof?.full_name || null };
    }));
    setMediaReviews(enriched);
  };

  const fetchStats = useCallback(async () => {
    const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: r } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
    const { count: w } = await supabase.from('watchlists').select('*', { count: 'exact', head: true });
    setStats({ users: u || 0, reviews: r || 0, watchlist: w || 0 });
  }, []);

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
      showToast('Review submitted successfully');
    } else {
      showToast('Error: ' + error.message, 'error');
      console.error('Review insert error:', error);
    }
  };

  const deleteReview = async (reviewId, mediaId) => {
    const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
    if (!error) { await fetchReviews(mediaId); showToast('Review deleted'); }
  };

  const updateReview = async (reviewId, text, newRating, mediaId) => {
    const { error } = await supabase.from('reviews').update({ review_text: text, user_rating: newRating }).eq('id', reviewId);
    if (!error) { await fetchReviews(mediaId); showToast('Review updated'); }
  };

  const voteReview = (reviewId) => {
    setLocalVotes(prev => {
      const current = prev[reviewId] || { up: false, count: 0 };
      if (current.up) {
        return { ...prev, [reviewId]: { up: false, count: current.count - 1 } };
      } else {
        return { ...prev, [reviewId]: { up: true, count: current.count + 1 } };
      }
    });
  };

  const submitReply = async (mediaId) => {
    if (!replyText.trim() || !user) return;
    const { error } = await supabase.from('reviews').insert([{
      media_id: String(mediaId),
      review_text: `↩ ${replyText}`,
      user_rating: rating,
      user_id: user.id
    }]);
    if (!error) {
      setReplyText('');
      setReplyTo(null);
      await fetchReviews(mediaId);
      showToast('Reply sent!');
    } else {
      showToast('Error: ' + error.message, 'error');
    }
  };

  const shareContent = (movie) => {
    const text = `Check out "${movie.title || movie.name}" on NovaStream! Rating: ${movie.vote_average}/10`;
    if (navigator.share) {
      navigator.share({ title: 'NovaStream', text, url: window.location.href });
    } else {
      showToast('Link copied to clipboard (Mock)');
    }
  };

  const addToWatchlist = async (m) => {
    if (watchlist.some(item => String(item.media_id) === String(m.id))) return showToast('Already in your watchlist', 'error');
    const { data: existing } = await supabase.from('watchlists').select('id').eq('media_id', m.id).eq('user_id', user?.id).single();
    if (existing) {
      return showToast('Already in your watchlist', 'error');
    }

    const { error } = await supabase.from('watchlists').insert([{
      media_id: m.id, title: m.title || m.name, poster_path: m.poster_path,
      vote_average: m.vote_average, user_id: user?.id, status: 'to_watch'
    }]);
    if (!error) { fetchWatchlist(); showToast('Added to watchlist'); }
  };

  const updateWatchlistStatus = async (id, status) => {
    const { error } = await supabase.from('watchlists').update({ status }).eq('id', id);
    if (!error) {
      fetchWatchlist();
      showToast(`Status updated to ${status === 'watched' ? 'Watched' : status === 'watching' ? 'Watching' : 'Plan to Watch'}`);
    }
  };

  const removeFromWatchlist = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) { fetchWatchlist(); showToast('Removed from watchlist'); }
  };

  useEffect(() => {
    if (selectedMedia) {
      fetchReviews(selectedMedia.id);
      fetchTrailer(selectedMedia);
      fetchTMDBReviews(selectedMedia);
      fetchMediaDetail(selectedMedia);
    }
  }, [selectedMedia]);

  // Fetch background posters for login screen if not logged in
  useEffect(() => {
    const loadBackground = async () => {
      if (trending.length === 0) {
        const t = await fetchMedia(`https://api.themoviedb.org/3/trending/movie/week`);
        setTrending(t);
      }
    };
    if (!user) loadBackground();
  }, [user, trending.length]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('[data-dropdown]')) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Memoized background rows — before any early returns (Rules of Hooks)
  const bgRow1 = React.useMemo(() => [...trending].sort(() => 0.5 - Math.random()), [trending.length]);
  const bgRow2 = React.useMemo(() => [...trending].sort(() => 0.5 - Math.random()), [trending.length]);

  if (authLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),rgba(2,6,23,1))] pointer-events-none" />
      <div className="relative flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 blur-xl animate-pulse" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-3 rounded-[1.2rem] border-2 border-dashed border-cyan-500/40"
          />
          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)] z-10">
            <Play size={28} className="text-white ml-1 fill-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-widest uppercase mt-4">
          <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">NOVA</span><span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">STREAM</span>
        </h1>
      </div>
    </div>
  );

  const userAverage = mediaReviews.length > 0 ? (mediaReviews.reduce((acc, rev) => acc + rev.user_rating, 0) / mediaReviews.length).toFixed(1) : "0.0";

  // Combine and format reviews for display
  const allReviews = [
    ...mediaReviews.map(r => ({ ...r, source: 'app' })),
    ...tmdbReviews.map(r => ({
      ...r,
      source: 'tmdb',
      user_id: r.author,
      user_rating: r.author_details?.rating ? Math.round(r.author_details.rating / 2) : 0,
      review_text: r.content,
      created_at: r.created_at
    }))
  ];


  if (!user) {

    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden flex flex-col gap-4 transform -rotate-12 scale-125">
          <div className="flex gap-4 animate-[slide_60s_linear_infinite]">
            {[...bgRow1, ...bgRow1, ...bgRow1].map((m, i) => (
              m.poster_path && <img key={i} src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className="w-48 h-72 object-cover rounded-2xl shadow-2xl" alt="" />
            ))}
          </div>
          <div className="flex gap-4 animate-[slide-reverse_50s_linear_infinite] ml-[-20%]">
            {[...bgRow2, ...bgRow2, ...bgRow2].map((m, i) => (
              m.poster_path && <img key={i} src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className="w-48 h-72 object-cover rounded-2xl shadow-2xl" alt="" />
            ))}
          </div>
          <div className="flex gap-4 animate-[slide_70s_linear_infinite] ml-[-10%]">
            {[...bgRow1, ...bgRow1, ...bgRow1].map((m, i) => (
              m.poster_path && <img key={i} src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className="w-48 h-72 object-cover rounded-2xl shadow-2xl" alt="" />
            ))}
          </div>
        </div>

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-[#020617]/40" />
        <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent to-[#020617] opacity-80" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-slate-950/60 p-10 md:p-14 rounded-[3rem] border border-white/10 w-full max-w-[460px] text-center backdrop-blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.15)]"
        >
          {/* Futuristic Icon */}
          <div className="relative mx-auto mb-6 w-fit">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 blur-lg animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-[6px] rounded-3xl border-2 border-dashed border-cyan-500/40"
            />
            <motion.div
              animate={{ rotate: [0, -8, 8, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              className="relative w-20 h-20 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.7)]"
            >
              <Clapperboard size={38} className="text-white drop-shadow-lg" />
            </motion.div>
          </div>
          {/* Futuristic Logo Text */}
          <h2 className="text-3xl font-black tracking-[0.04em] uppercase leading-none mb-3">
            <span className="bg-gradient-to-br from-white via-white to-slate-300 bg-clip-text text-transparent">NOVA</span>
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">STREAM</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-slate-600" />
            <div className="flex gap-1.5">
              <div className="w-1 h-1 rounded-full bg-cyan-500" />
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <div className="w-1 h-1 rounded-full bg-indigo-500" />
            </div>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-slate-600" />
          </div>
          <p className="text-slate-400 font-medium text-sm mb-10 tracking-wide">
            {isLogin ? 'Sign in to continue to your account' : 'Create an account to get started'}
          </p>

          <div className="space-y-4">
            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs py-3 px-4 rounded-xl text-left font-medium">
                {authError}
              </div>
            )}
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setAuthError(''); }}
                className="w-full bg-black/40 border border-white/10 px-6 py-4 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.02] transition-all text-sm placeholder:text-slate-500"
              />
            </div>
            <div className="relative group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const doAuth = async () => {
                      setAuthError('');
                      if (!email || !password) return setAuthError('Please enter your email and password.');
                      const { error } = isLogin
                        ? await supabase.auth.signInWithPassword({ email, password })
                        : await supabase.auth.signUp({ email, password });
                      if (error) setAuthError(error.message.includes('credentials') ? 'Invalid email or password.' : error.message);
                    };
                    doAuth();
                  }
                }}
                className="w-full bg-black/40 border border-white/10 px-6 py-4 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.02] transition-all text-sm placeholder:text-slate-500"
              />
            </div>

            <button
              onClick={async () => {
                setAuthError('');
                if (!email || !password) return setAuthError('Please enter your email and password.');
                const { error } = isLogin
                  ? await supabase.auth.signInWithPassword({ email, password })
                  : await supabase.auth.signUp({ email, password });
                if (error) setAuthError(error.message.includes('credentials') ? 'Invalid email or password.' : error.message);
              }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-4 rounded-2xl text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all active:scale-[0.98] mt-2"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-8 text-sm text-slate-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setAuthError(''); setEmail(''); setPassword(''); }}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (profile?.role === 'Admin') return <AdminDashboard stats={stats} profile={profile} />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  const uniqueWatchlistForResume = watchlist.filter((item, index, self) =>
    index === self.findIndex(t => String(t.media_id) === String(item.media_id))
  );
  const allSections = [
    { title: "Continue Watching", data: uniqueWatchlistForResume.slice(0, 10), icon: <Clock size={20} />, type: 'resume', category: 'all', sub: 'all', condition: uniqueWatchlistForResume.length > 0 },
    { title: "Trending Movies", data: trending, icon: <Activity size={20} />, category: 'movie', sub: 'all', condition: true },
    { title: "Trending TV Series", data: trendingTV, icon: <MonitorPlay size={20} />, category: 'tv', sub: 'all', condition: true },
    { title: "Top Rated TV Series", data: topRatedTV, icon: <Award size={20} />, category: 'tv', sub: 'all', condition: true },
    { title: "Action & Adventure", data: action, icon: <Sword size={20} />, category: 'movie', sub: 'action', condition: true },
    { title: "Action Series", data: actionTV, icon: <Sword size={20} />, category: 'tv', sub: 'action', condition: true },
    { title: "Horror & Thriller", data: horror, icon: <Skull size={20} />, category: 'movie', sub: 'horror', condition: true },
    { title: "Mystery & Thriller Series", data: horrorTV, icon: <Skull size={20} />, category: 'tv', sub: 'horror', condition: true },
    { title: "Drama", data: drama, icon: <Heart size={20} />, category: 'movie', sub: 'drama', condition: true },
    { title: "Drama Series", data: dramaTV, icon: <Heart size={20} />, category: 'tv', sub: 'drama', condition: true },
    { title: "Sci-Fi & Fantasy", data: scifi, icon: <Cpu size={20} />, category: 'movie', sub: 'scifi', condition: true },
    { title: "Sci-Fi Series", data: scifiTV, icon: <Cpu size={20} />, category: 'tv', sub: 'scifi', condition: true },
    { title: "Comedy", data: comedy, icon: <Laugh size={20} />, category: 'movie', sub: 'comedy', condition: true },
    { title: "Comedy Series", data: comedyTV, icon: <Laugh size={20} />, category: 'tv', sub: 'comedy', condition: true },
    { title: "Documentaries", data: documentary, icon: <BookOpen size={20} />, category: 'doc', sub: 'all', condition: true },
    { title: "Sports", data: sports, icon: <Trophy size={20} />, category: 'sports', sub: 'all', condition: true }
  ];

  // --- CRITICAL FILTERING LOGIC ---
  const filteredSections = allSections.filter(s => {
    if (s.type === 'resume') return mainTab === 'home' && activeSub === 'all';
    if (mainTab === 'home') {
      if (activeSub === 'all') return true;
      return s.sub === activeSub;
    }
    if (s.category !== mainTab) return false;
    if (activeSub !== 'all' && s.sub !== activeSub) return false;
    return true;
  });

  // Global Deduplication for currently viewed screen
  const renderedMovieIds = new Set();
  const dedupedSections = filteredSections.map(section => {
    if (section.type === 'resume') return section;
    const uniqueData = [];
    for (const movie of section.data) {
      if (!renderedMovieIds.has(movie.id)) {
        renderedMovieIds.add(movie.id);
        uniqueData.push(movie);
      }
    }
    return { ...section, data: uniqueData };
  });

  // Use full media detail if available, otherwise fallback to basic info
  const displayMedia = mediaDetail || selectedMedia;

  const renderWatchlistItem = (item) => (
    <div key={item.id} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[2/3] bg-slate-900 border border-white/5 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:scale-[1.03]">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        alt={item.title}
      />

      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

      {/* Hover overlay — darkens everything */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top badges — always visible */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
        <span className="bg-black/80 px-2 py-0.5 rounded-md text-[10px] font-bold text-yellow-400 flex items-center gap-1">
          <Star size={10} className="fill-yellow-400" /> {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
        </span>
        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${item.status === 'watched' ? 'bg-emerald-900/80 text-emerald-300' :
          item.status === 'watching' ? 'bg-blue-900/80 text-blue-300' :
            'bg-cyan-900/80 text-cyan-300'
          }`}>
          {item.status === 'watched' ? 'Watched' : item.status === 'watching' ? 'Watching' : 'Plan'}
        </span>
      </div>

      {/* Title — always visible at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <h4 className="text-white font-bold text-xs line-clamp-2 drop-shadow-md mb-2">{item.title}</h4>

        {/* Action buttons — visible only on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button onClick={(e) => { e.stopPropagation(); updateWatchlistStatus(item.id, 'to_watch'); }}
            className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center justify-center gap-0.5 transition-all ${item.status === 'to_watch' || !item.status ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/40' : 'bg-white/10 text-slate-300 hover:bg-cyan-500/80 hover:text-white'
              }`}>
            <Clock size={10} /> Plan
          </button>
          <button onClick={(e) => { e.stopPropagation(); updateWatchlistStatus(item.id, 'watching'); }}
            className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center justify-center gap-0.5 transition-all ${item.status === 'watching' ? 'bg-blue-500 text-white shadow-md shadow-blue-500/40' : 'bg-white/10 text-slate-300 hover:bg-blue-500/80 hover:text-white'
              }`}>
            <Play size={10} /> Watch
          </button>
          <button onClick={(e) => { e.stopPropagation(); updateWatchlistStatus(item.id, 'watched'); }}
            className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center justify-center gap-0.5 transition-all ${item.status === 'watched' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/40' : 'bg-white/10 text-slate-300 hover:bg-emerald-500/80 hover:text-white'
              }`}>
            <Check size={10} /> Done
          </button>
          <button onClick={(e) => { e.stopPropagation(); removeFromWatchlist(item.id); }}
            className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all">
            <X size={10} />
          </button>
        </div>
      </div>

      {/* Click to open detail */}
      <div className="absolute inset-0 z-0" onClick={() => setSelectedMedia({ id: item.media_id, title: item.title, poster_path: item.poster_path })} />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 pb-40 selection:bg-cyan-500/20 selection:text-cyan-200 overflow-hidden">
      {/* MINIMAL & ELEGANT BACKGROUND */}
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020617]" />

      {/* GHOST CINEMATIC CHARACTERS (Optimized GPU Layers) */}
      {trending.slice(0, 3).map((movie, i) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 0 }}
          animate={{ opacity: 0.08, scale: 1.05, y: [0, -15, 0] }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'linear', delay: i * 2 }}
          key={`ghost-${movie.id}`}
          className="fixed pointer-events-none z-[-1]"
          style={{
            top: i === 0 ? '-10%' : i === 1 ? '40%' : '10%',
            left: i === 0 ? '-5%' : i === 1 ? '60%' : '75%',
            width: i === 1 ? '80vw' : '60vw',
            height: i === 1 ? '80vw' : '60vw',
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path || movie.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(circle at center, black 15%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 65%)',
            filter: 'grayscale(100%) contrast(150%)',
            willChange: 'transform, opacity'
          }}
        />
      ))}

      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)' }} />
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(6,182,212,0.25),rgba(2,6,23,0))]" />
      
      {/* Optimized Ambient Lights (No CSS Blur) */}
      <div className="fixed top-[-20%] left-[10%] w-[60vw] h-[60vw] pointer-events-none z-[-1] opacity-40" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-20%] right-[0%] w-[50vw] h-[50vw] pointer-events-none z-[-1] opacity-40" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)' }} />

      <AnimatePresence>{toast.message && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className={`fixed bottom-8 right-8 z-[400] px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'}`}>
          {toast.type === 'error' ? <ShieldAlert size={20} /> : <CheckCircle size={20} />}
          <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
        </motion.div>
      )}</AnimatePresence>

      <nav className="border-b border-white/5 bg-[#020617]/95 backdrop-blur-2xl sticky top-0 z-[100]">
        <div className="px-6 md:px-10 py-5 flex items-center gap-4 max-w-[2000px] mx-auto">
          {/* LEFT: Logo + Nav Tabs */}
          <div className="flex items-center gap-5 md:gap-8 min-w-0 flex-1">
            {/* FUTURISTIC LOGO */}
            <div className="flex items-center gap-3 cursor-pointer group select-none shrink-0" onClick={() => { setMainTab('home'); setActiveSub('all'); setSearchQuery(''); setView('browse'); }}>
              <div className="relative">
                <div className="absolute -inset-[5px] rounded-[14px] bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 blur-sm group-hover:blur-md transition-all" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-[4px] rounded-[14px] border border-dashed border-cyan-500/40"
                />
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] z-10">
                  <Play size={18} className="text-white ml-0.5 fill-white" />
                </div>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-widest uppercase ml-2">
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">NOVA</span><span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">STREAM</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
              {[
                { id: 'home', label: 'Home' },
                { id: 'movie', label: 'Movies' },
                { id: 'tv', label: 'TV Series' },
                { id: 'sports', label: 'Sports' },
                { id: 'doc', label: 'Documentary' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setMainTab(tab.id); setActiveSub('all'); setView('browse'); }}
                  className={`text-[12px] font-black uppercase tracking-[0.12em] transition-all relative py-2 whitespace-nowrap shrink-0 ${mainTab === tab.id ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                >
                  {tab.label}
                  {mainTab === tab.id && <motion.div layoutId="navTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Search + Actions */}
          <div className="flex items-center gap-3 md:gap-5 text-[12px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            <div className="relative group hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input type="text" placeholder="Search titles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-900 border border-white/10 px-10 py-2.5 rounded-full text-white outline-none focus:border-cyan-500/50 w-64 focus:w-80 transition-all text-xs placeholder:text-slate-500" />
            </div>

            {/* NOTIFICATIONS */}
            <div className="relative" data-dropdown="true">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative hover:text-white transition-colors p-2 rounded-full ${showNotifications ? 'bg-white/10 text-white' : ''}`}
              >
                <Bell size={18} />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)] animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-4 w-[340px] md:w-[380px] bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[200]"
                  >
                    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
                      <h4 className="text-white font-bold text-sm tracking-wide normal-case">Notifications</h4>
                      <button
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        className="text-[10px] text-cyan-500 hover:text-cyan-400 font-semibold normal-case tracking-normal"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                      {notifications.length > 0 ? notifications.map(notif => (
                        <div key={notif.id} onClick={() => setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n))} className={`p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer flex gap-4 ${!notif.read ? 'bg-cyan-500/[0.03]' : ''}`}>
                          <div className="mt-1 shrink-0">
                            {notif.type === 'new' ? <Film size={18} className="text-blue-400" /> :
                              notif.type === 'new_tv' ? <Flame size={18} className="text-orange-500" /> :
                                notif.type === 'recommendation' ? <Star size={18} className="text-yellow-400" /> :
                                  <Info size={18} className="text-slate-400" />}
                          </div>
                          <div>
                            <h5 className={`text-[13px] font-bold normal-case tracking-normal mb-1 ${!notif.read ? 'text-white' : 'text-slate-300'}`}>{notif.title}</h5>
                            <p className="text-xs text-slate-400 leading-relaxed normal-case tracking-normal">{notif.message}</p>
                            <span className="text-[10px] text-cyan-500 font-medium mt-2 block normal-case tracking-normal">{notif.time}</span>
                          </div>
                          {!notif.read && <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
                        </div>
                      )) : (
                        <div className="p-8 text-center text-slate-500 text-xs normal-case tracking-normal">No notifications</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WATCHLIST CAPSULE */}
            <button
              onClick={() => { setView('watchlist'); setShowProfileMenu(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${view === 'watchlist'
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
            >
              <Bookmark size={15} className={view === 'watchlist' ? 'text-cyan-400' : ''} />
              <span className="hidden md:inline">Watchlist</span>
            </button>

            {/* PROFILE DROPDOWN (PRIME STYLE) */}
            <div className="relative" data-dropdown="true">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${showProfileMenu || view === 'profile'
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                  }`}
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] text-white font-black shadow-inner">
                  {profile?.full_name ? profile.full_name[0].toUpperCase() : <User size={12} />}
                </div>
                <span className="hidden md:inline">{profile?.full_name?.split(' ')[0] || 'Profile'}</span>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-4 w-[280px] bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-[200] py-2"
                  >
                    <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Your Account</p>
                      <p className="text-sm font-bold text-white normal-case tracking-normal truncate">{profile?.full_name || 'Supernova'}</p>
                      <p className="text-xs text-slate-400 normal-case tracking-normal truncate">{user?.email}</p>
                    </div>

                    <div className="py-2 border-b border-white/5">
                      <button
                        onClick={() => { setProfileInitialTab('overview'); setView('profile'); setShowProfileMenu(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-all normal-case tracking-normal"
                      >
                        <User size={16} className="text-blue-500" /> My Profile
                      </button>
                      <button
                        onClick={() => { setProfileInitialTab('settings'); setView('profile'); setShowProfileMenu(false); }}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-all normal-case tracking-normal"
                      >
                        <Settings size={16} className="text-cyan-500" /> Account & Settings
                      </button>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={() => supabase.auth.signOut()}
                        className="w-full px-5 py-2.5 text-left text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-3 transition-all normal-case tracking-normal"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SUB-CATEGORY TABS */}
        {view === 'browse' && (mainTab === 'home' || mainTab === 'movie' || mainTab === 'tv') && (
          <div className="px-8 md:px-12 py-4 bg-slate-950/60 border-t border-white/[0.05] shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-[2000px] mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-slate-900/80 p-1.5 rounded-full border border-white/5 w-fit shadow-inner mx-auto md:mx-0 backdrop-blur-xl">
              {[
                { id: 'all', label: 'All Content' },
                { id: 'action', label: 'Action' },
                { id: 'horror', label: 'Horror' },
                { id: 'drama', label: 'Drama' },
                { id: 'scifi', label: 'Sci-Fi' },
                { id: 'comedy', label: 'Comedy' }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${activeSub === sub.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="p-8 md:p-12 max-w-[2000px] mx-auto">
        {searchQuery ? (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-white tracking-wide">Search Results: "{searchQuery}"</h3>
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
                {[...Array(12)].map((_, i) => <div key={i} className="aspect-[2/3] bg-slate-900 animate-pulse rounded-2xl" />)}
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-20 text-slate-500">No content found matching your criteria.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
                {searchResults.map((m) => <MovieCard key={m.id} movie={m} onSelect={setSelectedMedia} onAdd={addToWatchlist} />)}
              </div>
            )}
          </div>
        ) : view === 'browse' ? (
          <div className="space-y-16 md:space-y-20">
            {mainTab === 'home' && activeSub === 'all' && (
              <>
                <HeroCarousel movies={trending.slice(0, 5)} onSelect={setSelectedMedia} onAdd={addToWatchlist} watchlist={watchlist} />

                {/* AI RECOMMENDATIONS SECTION */}
                {watchlist.length > 0 && (
                  <section className="relative px-6 group/row">
                    <div className="flex items-center gap-3.5 mb-8">
                      <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-purple-400 to-pink-600 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                      <h3 className="text-2xl font-black bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent tracking-tight">AI Recommended For You</h3>
                      <span className="text-[10px] font-bold bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/30 uppercase tracking-widest ml-2">Neural Engine v2.0</span>
                    </div>
                    <div className="row-scroll no-scrollbar flex flex-nowrap gap-5 md:gap-6 overflow-x-auto scroll-smooth pb-8 px-2 relative z-10">
                      {getSophisticatedRecommendations(watchlist, [...trending, ...popular, ...topRated], []).slice(0, 10).map((movie) => (
                        <div key={movie.id} className="shrink-0 w-[140px] md:w-[180px] lg:w-[220px] relative group">
                          <MovieCard movie={movie} onSelect={setSelectedMedia} onAdd={addToWatchlist} />
                          <div className="absolute top-2 right-2 bg-purple-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            Score: {movie.recommendation_score.toFixed(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}

            {tmdbError && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex items-center gap-4 text-red-400">
                <ShieldAlert size={24} />
                <div>
                  <p className="font-bold text-sm">TMDB API Connection Error</p>
                  <p className="text-xs text-red-400/70 mt-1">Failed to load movie data. Please check your DNS settings or use a VPN. (api.themoviedb.org is blocked)</p>
                </div>
              </motion.div>
            )}
            {dedupedSections.map((section, idx) => {
              if (!section.condition || section.data.length === 0) return null;
              const isGrid = false; // All sections scroll horizontally
              return (
                <section key={idx} className="relative group/row">
                  <div className="flex items-center gap-3.5 mb-6 px-8">
                    <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                    <h3 className="text-2xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight capitalize">{section.title.replace(/_/g, ' ')}</h3>
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => { e.currentTarget.parentElement.querySelector('.row-scroll').scrollBy({ left: -700, behavior: 'smooth' }); }}
                      className="absolute left-1 top-[45%] -translate-y-1/2 z-20 p-2.5 bg-black/70 hover:bg-cyan-500 rounded-full text-white transition-all shadow-xl opacity-0 group-hover/row:opacity-100"
                    ><ChevronLeft size={20} /></button>
                    <div className="row-scroll no-scrollbar flex flex-nowrap gap-4 md:gap-5 overflow-x-auto scroll-smooth pb-6 px-8">
                      {section.data.map((movie) => (
                        <div key={movie.id} className="shrink-0 w-[140px] md:w-[170px] lg:w-[200px] relative group">
                          <MovieCard movie={section.type === 'resume' ? { ...movie, id: movie.media_id } : movie} onSelect={setSelectedMedia} onAdd={addToWatchlist} />
                          {section.type === 'resume' && <div className="absolute bottom-0 left-0 h-1 bg-cyan-500 w-3/4 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.currentTarget.parentElement.querySelector('.row-scroll').scrollBy({ left: 700, behavior: 'smooth' }); }}
                      className="absolute right-1 top-[45%] -translate-y-1/2 z-20 p-2.5 bg-black/70 hover:bg-cyan-500 rounded-full text-white transition-all shadow-xl opacity-0 group-hover/row:opacity-100"
                    ><ChevronRight size={20} /></button>
                  </div>
                </section>
              );
            })}
          </div>
        ) : view === 'watchlist' ? (
          <div className="animate-in fade-in duration-500 space-y-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-8 w-1.5 rounded-full bg-cyan-500" />
              <h3 className="text-3xl font-black text-white tracking-wide">My Watchlist</h3>
            </div>

            {watchlist.length === 0 ? (
              <div className="text-center py-20 text-slate-500 bg-slate-900/20 rounded-3xl border border-white/5">
                <Bookmark size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Your watchlist is empty.</p>
                <p className="text-sm mt-1">Add movies and TV shows to keep track of what you want to watch.</p>
              </div>
            ) : (
              <div className="space-y-16">
                {(() => {
                  // Deduplicate watchlist by media_id
                  const seen = new Set();
                  const uniqueWatchlist = watchlist.filter(item => {
                    if (seen.has(String(item.media_id))) return false;
                    seen.add(String(item.media_id));
                    return true;
                  });
                  const watching = uniqueWatchlist.filter(i => i.status === 'watching');
                  const toWatch = uniqueWatchlist.filter(i => i.status === 'to_watch' || !i.status);
                  const watched = uniqueWatchlist.filter(i => i.status === 'watched');
                  return (<>
                    {/* CURRENTLY WATCHING */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-6 w-1 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                        <h4 className="text-xl font-black text-white tracking-wide">Currently Watching <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/30 ml-2">{watching.length}</span></h4>
                      </div>
                      {watching.length === 0 ? (
                        <p className="text-sm text-slate-500 italic bg-slate-900/40 p-6 rounded-2xl border border-white/5">No movies or series currently in progress.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                          {watching.map(item => renderWatchlistItem(item))}
                        </div>
                      )}
                    </div>

                    {/* PLAN TO WATCH */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-6 w-1 rounded-full bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                        <h4 className="text-xl font-black text-white tracking-wide">Plan to Watch <span className="text-xs font-bold bg-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/30 ml-2">{toWatch.length}</span></h4>
                      </div>
                      {toWatch.length === 0 ? (
                        <p className="text-sm text-slate-500 italic bg-slate-900/40 p-6 rounded-2xl border border-white/5">Your planned watchlist is empty.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                          {toWatch.map(item => renderWatchlistItem(item))}
                        </div>
                      )}
                    </div>

                    {/* ALREADY WATCHED */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-6 w-1 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                        <h4 className="text-xl font-black text-white tracking-wide">Already Watched <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 ml-2">{watched.length}</span></h4>
                      </div>
                      {watched.length === 0 ? (
                        <p className="text-sm text-slate-500 italic bg-slate-900/40 p-6 rounded-2xl border border-white/5">No completed titles yet.</p>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                          {watched.map(item => renderWatchlistItem(item))}
                        </div>
                      )}
                    </div>
                  </>);
                })()}
              </div>
            )}
          </div>
        ) : <ProfilePage profile={profile} user={user} initialTab={profileInitialTab} />}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#020617]/80 backdrop-blur-xl mt-8 py-10 px-8">
        <div className="max-w-[900px] mx-auto flex flex-col items-center gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2.5 select-none">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Play size={13} className="text-white ml-0.5 fill-white" />
            </div>
            <span className="text-lg font-black tracking-widest uppercase ml-2">
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">NOVA</span><span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]">STREAM</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-slate-500 font-medium">
            {['Terms & Privacy', 'Cookie Notice', 'Help Center', 'Feedback', 'About NovaStream'].map(link => (
              <button key={link} onClick={() => setFooterModal(link)} className="hover:text-cyan-400 transition-colors">{link}</button>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-slate-600 tracking-wide text-center">
            © {new Date().getFullYear()} NovaStream. All rights reserved. · Powered by{' '}
            <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-500 transition-colors">TMDB</a>
          </p>
        </div>
      </footer>

      {/* FOOTER MODAL */}
      <AnimatePresence>
        {footerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[400] flex items-center justify-center p-4"
            onClick={() => setFooterModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl p-8 relative shadow-2xl"
            >
              <button onClick={() => setFooterModal(null)} className="absolute top-4 right-4 text-slate-500 hover:text-white bg-white/5 p-2 rounded-full">
                <X size={16} />
              </button>
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                <Info className="text-cyan-500" /> {footerModal}
              </h2>
              <div className="text-slate-400 text-sm leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                {footerModal === 'About NovaStream' ? (
                  <p>NovaStream is a next-generation streaming platform concept designed to provide an immersive, cinematic experience. It combines real TMDB data with a hyper-modern UI, intelligent categorizations, and social interaction features like watchlists and reviews.</p>
                ) : footerModal === 'Help Center' ? (
                  <p>Need assistance? Our support agents are currently offline. Please check your network connection, ensure you have an active TMDB API key, or contact your system administrator.</p>
                ) : footerModal === 'Feedback' ? (
                  <form className="space-y-4 mt-2" onSubmit={e => { e.preventDefault(); setFooterModal(null); setToast({ message: 'Feedback sent!', type: 'success' }); }}>
                    <textarea placeholder="Tell us what you think..." className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cyan-500 min-h-[120px]" required />
                    <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-colors">Submit Feedback</button>
                  </form>
                ) : (
                  <>
                    <p>This is a legal placeholder for {footerModal}. By using this application, you agree to our comprehensive set of fictional rules designed to make this modal look sufficiently populated.</p>
                    <p>We do not actually collect cookies, nor do we share your data, because this is a client-side portfolio application. All your data lives securely in your local Supabase instance.</p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">{selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 md:p-8 z-[300] backdrop-blur-md"
          onClick={() => { setSelectedMedia(null); setMediaDetail(null); }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 400 }}
            className="bg-[#0a0a0f] border border-white/10 max-w-[1500px] w-full flex flex-col lg:flex-row rounded-3xl overflow-hidden h-full max-h-[90vh] shadow-[0_0_80px_rgba(0,0,0,0.8)] relative"
            onClick={e => e.stopPropagation()}
          >

            {/* LEFT: Trailer + Movie Info */}
            <div className="w-full lg:w-[58%] relative bg-black flex flex-col border-r border-white/5 overflow-hidden">
              {/* Backdrop image behind */}
              <div className="absolute inset-0 z-0">
                <img
                  src={`https://image.tmdb.org/t/p/w1280${displayMedia.backdrop_path || displayMedia.poster_path}`}
                  className="w-full h-full object-cover opacity-[0.08] blur-sm"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
              </div>

              {/* Trailer / Poster Area */}
              <div className="flex-1 bg-black/40 flex items-center justify-center min-h-[320px] relative z-10">
                {trailerKey ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex flex-col items-center gap-6 p-10">
                    <div className="relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${displayMedia.poster_path}`}
                        className="w-48 h-72 object-cover rounded-2xl shadow-2xl shadow-cyan-500/10 border border-white/10"
                        alt={displayMedia.title}
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] mb-3">No Official Trailer</span>
                        <button
                          onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent((displayMedia.title || displayMedia.name) + ' official trailer')}`, '_blank')}
                          className="bg-red-600/90 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-red-500/20 backdrop-blur-md"
                        >
                          <Play size={12} fill="white" /> Search on YouTube
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Movie Info Section */}
              <div className="relative z-10 p-8 md:p-12 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent">
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1.5 rounded-lg flex items-center gap-2 text-[12px] font-bold shadow-lg shadow-cyan-500/20">
                    <Star size={13} fill="white" /> {displayMedia.vote_average?.toFixed(1)}
                  </span>
                  <span className="bg-white/5 text-white/70 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-white/5 flex items-center gap-2">
                    <Calendar size={12} /> {displayMedia.release_date?.split('-')[0] || displayMedia.first_air_date?.split('-')[0]}
                  </span>
                  {displayMedia.original_language && (
                    <span className="bg-white/5 text-white/70 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-white/5 flex items-center gap-2">
                      <Globe size={12} /> {displayMedia.original_language?.toUpperCase()}
                    </span>
                  )}
                  {displayMedia.runtime > 0 && (
                    <span className="bg-white/5 text-white/70 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-white/5 flex items-center gap-2">
                      <Clock size={12} /> {displayMedia.runtime} min
                    </span>
                  )}
                  {displayMedia.vote_count > 0 && (
                    <span className="bg-white/5 text-white/50 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-white/5">
                      {displayMedia.vote_count.toLocaleString()} votes
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 text-white tracking-tight leading-[1.1]">
                  {displayMedia.title || displayMedia.name}
                </h2>

                {/* Genres */}
                {displayMedia.genres && displayMedia.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {displayMedia.genres.map(g => (
                      <span key={g.id} className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-500/10">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <p className="text-white/60 text-[14px] md:text-[15px] leading-[1.8] font-medium border-l-2 border-cyan-500/40 pl-5 max-h-[120px] overflow-y-auto no-scrollbar">
                  {displayMedia.overview || "No synopsis available for this title."}
                </p>

                {/* Add to watchlist button */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => addToWatchlist(displayMedia)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95"
                  >
                    <Plus size={16} /> Add to Watchlist
                  </button>
                  <button
                    onClick={() => shareContent(displayMedia)}
                    className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/5 hover:border-white/20"
                  >
                    <Globe size={16} /> Share
                  </button>
                  {displayMedia.homepage && (
                    <button
                      onClick={() => window.open(displayMedia.homepage, '_blank')}
                      className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 border border-white/5 hover:border-white/20"
                    >
                      <Info size={16} /> Source
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Reviews Panel */}
            <div className="flex-1 flex flex-col bg-[#0a0a0f] overflow-hidden">
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/5 bg-gradient-to-r from-slate-900/50 to-transparent backdrop-blur-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-[13px] font-bold text-white flex items-center gap-2 mb-1">
                      <MessageSquare size={16} className="text-cyan-500" /> Global Reception
                    </h4>
                    <p className="text-[11px] text-slate-500">{allReviews.length} records found</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white tabular-nums">{userAverage}</span>
                      <span className="text-lg text-white/30 font-bold">/5</span>
                    </div>
                    <p className="text-[10px] font-semibold text-cyan-500/60 uppercase tracking-wider">Local Avg</p>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 no-scrollbar">
                {allReviews.length > 0 ? allReviews.map((rev, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx}
                    className={`bg-white/[0.03] border ${rev.source === 'tmdb' ? 'border-purple-500/10' : 'border-cyan-500/10'} p-5 rounded-2xl hover:border-white/20 transition-all duration-300 group relative`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-[11px] font-bold border ${rev.source === 'tmdb' ? 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/20' : 'from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/20'}`}>
                          {(rev._username || rev.user_id)?.slice(0, 2)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-white/80 flex items-center gap-2">
                              {rev.source === 'tmdb' ? rev.user_id : (rev._username || profile?.username || `User ${rev.user_id?.slice(0, 6)}`)}
                              {rev.source === 'tmdb' && <span className="bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border border-purple-500/30">TMDB</span>}
                            </span>
                            {(user?.id === rev.user_id || profile?.role === 'Admin') && rev.source !== 'tmdb' && (
                              <div className="flex gap-2">
                                <button onClick={() => deleteReview(rev.id, selectedMedia.id)} className="text-red-500 hover:text-red-400 transition-colors">
                                  <X size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-600">{rev.created_at ? new Date(rev.created_at).toLocaleDateString() : 'Unknown Date'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={i < rev.user_rating ? (rev.source === 'tmdb' ? 'fill-purple-500 text-purple-500' : 'fill-cyan-500 text-cyan-500') : "text-white/10"} />
                          ))}
                        </div>
                        <span className={`text-[11px] font-bold ml-1 ${rev.source === 'tmdb' ? 'text-purple-500' : 'text-cyan-500'}`}>{rev.user_rating || 0}/5</span>
                      </div>
                    </div>
                    <p className="text-white/70 text-[13px] leading-relaxed pl-11 mb-3">
                      "{rev.review_text}"
                    </p>
                    {rev.source !== 'tmdb' && (
                      <div className="pl-11">
                        <div className="flex items-center gap-4 mb-2">
                          <button
                            onClick={() => voteReview(rev.id)}
                            className={`flex items-center gap-1 text-[10px] font-bold transition-colors ${localVotes[rev.id]?.up ? 'text-cyan-400' : 'text-slate-500 hover:text-cyan-500'
                              }`}
                          >
                            <TrendingUp size={12} /> {localVotes[rev.id]?.count || 0}
                          </button>
                          <button
                            onClick={() => setReplyTo(replyTo === rev.id ? null : rev.id)}
                            className={`text-[10px] font-bold transition-colors flex items-center gap-1 ${replyTo === rev.id ? 'text-cyan-400' : 'text-slate-500 hover:text-white'
                              }`}
                          >
                            <MessageSquare size={12} /> {replyTo === rev.id ? 'Cancel' : 'Reply'}
                          </button>
                        </div>
                        {replyTo === rev.id && (
                          <div className="flex gap-2 mt-2">
                            <input
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              onKeyDown={(e) => { if (e.key === 'Enter' && replyText.trim()) submitReply(selectedMedia.id); }}
                              placeholder={`Replying to ${rev.user_id?.slice(0, 8) || 'user'}...`}
                              autoFocus
                              className="flex-1 bg-white/[0.04] border border-cyan-500/30 px-3 py-2 rounded-xl text-[12px] text-white outline-none focus:border-cyan-500/60 placeholder:text-slate-600"
                            />
                            <button
                              onClick={() => submitReply(selectedMedia.id)}
                              disabled={!replyText.trim()}
                              className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl text-[11px] font-bold transition-all"
                            >
                              Send
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center gap-4 py-16">
                    <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                      <MessageSquare size={32} className="text-slate-700" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-slate-500 mb-1">No signals found</p>
                      <p className="text-xs text-slate-700">Be the first to inject perception data!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Review Section */}
              <div className="p-6 md:p-8 bg-gradient-to-t from-slate-950 to-[#0a0a0f] border-t border-white/5">
                {/* Star Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Your Rating:</span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setRating(n)}
                        className={`group/star relative w-10 h-10 rounded-xl border text-[14px] font-black transition-all duration-200 ${rating >= n
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/30 scale-105'
                          : 'bg-white/[0.02] border-white/10 text-slate-600 hover:border-cyan-500/30 hover:text-cyan-500 hover:bg-cyan-500/5'
                          }`}
                      >
                        <Star size={16} className={`mx-auto ${rating >= n ? 'fill-white' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input + Submit */}
                <div className="flex gap-3">
                  <input
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && review) submitReview(selectedMedia.id); }}
                    placeholder="Inject perception data..."
                    className="flex-1 bg-white/[0.04] border border-white/10 px-5 py-3.5 rounded-xl text-[13px] text-white outline-none focus:border-cyan-500/50 focus:bg-white/[0.06] transition-all placeholder:text-slate-600"
                  />
                  <button
                    onClick={() => submitReview(selectedMedia.id)}
                    disabled={!review}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white px-6 py-3.5 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:shadow-none active:scale-95 flex items-center gap-2"
                  >
                    <Zap size={14} /> Transmit
                  </button>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-all z-[110] bg-black/60 hover:bg-red-600 p-2.5 rounded-full border border-white/10 hover:border-red-500 hover:rotate-90 duration-300 backdrop-blur-sm"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

export default App;