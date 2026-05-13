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
  Cpu, Zap, HardDrive, Bell, Settings, Filter, Clock,
  Ghost, Laugh, Tv, Film, Eye, ShieldAlert, ZapOff,
  Flame, TrendingUp, BarChart3, Layers, MonitorPlay,
  Clapperboard, Home as HomeIcon, Trophy, Compass,
  Sword, Heart, Skull, BookOpen
} from 'lucide-react';

// =========================================================================
// --- 1. COMPONENT: ADMIN_ROOT_STATION ---
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
              Merkezi_<span className="text-red-600">Yönetim</span>_Paneli
            </h2>
            <div className="flex items-center gap-10 mt-10">
              <div className="flex flex-col gap-1">
                <span className="text-slate-600 text-[9px] uppercase tracking-widest text-left">Aktif_Operatör</span>
                <p className="text-slate-300 text-[11px] uppercase tracking-[0.4em]">{profile?.email}</p>
              </div>
              <div className="flex flex-col gap-1 border-l border-slate-800 pl-10">
                <span className="text-slate-600 text-[9px] uppercase tracking-widest text-left">Sistem_Durumu</span>
                <p className="text-green-500 text-[11px] uppercase tracking-[0.4em] animate-pulse">Stabil_Çalışıyor</p>
              </div>
            </div>
          </motion.div>
          
          <button 
            onClick={() => supabase.auth.signOut()} 
            className="group relative overflow-hidden bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/20 px-12 py-5 rounded-[2.5rem] text-[12px] font-black uppercase transition-all duration-500 shadow-2xl shadow-red-600/10 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-4"><LogOut size={18} /> Tüm_Süreçleri_Durdur</span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Kayıtlı_Birimler', value: stats.users, icon: <User size={40} />, color: 'bg-red-600' },
            { label: 'Nöral_Girişler', value: stats.reviews, icon: <MessageSquare size={40} />, color: 'bg-orange-600' },
            { label: 'Arşiv_Düğümleri', value: stats.watchlist, icon: <Database size={40} />, color: 'bg-amber-600' }
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
      </div>
    </div>
  );
};

// =========================================================================
// --- 2. COMPONENTS: STAFF & PROFILE ---
// =========================================================================

const StaffDashboard = () => (
  <div className="min-h-screen bg-[#020617] flex items-center justify-center p-10 font-mono text-center">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-slate-900 p-24 border border-blue-500/20 rounded-[5.5rem] w-full max-w-2xl backdrop-blur-3xl shadow-2xl">
      <div className="w-32 h-32 bg-blue-500/10 rounded-[3.5rem] flex items-center justify-center text-blue-500 mx-auto mb-14 border border-blue-500/20">
        <Activity size={64} className="animate-pulse" />
      </div>
      <h2 className="text-5xl font-black text-blue-500 mb-6 tracking-tighter uppercase italic">Personel_Sektörü</h2>
      <p className="text-slate-500 mb-16 text-[13px] font-medium uppercase tracking-[0.5em]">Nöral İçerik Moderasyonu Aktif</p>
      <button onClick={() => supabase.auth.signOut()} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] transition-all active:scale-95">Bağlantıyı_Kes</button>
    </motion.div>
  </div>
);

const ProfileView = ({ profile, watchlist }) => (
  <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-20 duration-1000 py-20">
    <div className="bg-slate-900 border border-slate-800 rounded-[6rem] p-24 mb-20 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[25rem] font-black italic text-cyan-500 leading-none uppercase">UNIT</span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <div className="w-64 h-60 bg-gradient-to-br from-cyan-500 via-cyan-800 to-slate-950 rounded-[5rem] flex items-center justify-center text-7xl font-black text-white shadow-2xl border-[6px] border-white/10">{profile?.email?.[0].toUpperCase() || 'U'}</div>
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-5 mb-6">
            <div className="w-3 h-3 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.7em]">Nöral_Birim_Doğrulandı</span>
          </div>
          <h2 className="text-7xl font-black tracking-tighter uppercase italic text-white mb-8 drop-shadow-lg">{profile?.email?.split('@')[0]}</h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            <span className="bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 px-10 py-4 rounded-[1.5rem] text-[12px] font-black uppercase tracking-[0.4em]">Yetki_Seviyesi: {profile?.role || 'User'}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {[ 
        { label: 'Senkronize_Nesneler', value: watchlist.length, unit: 'Düğüm' }, 
        { label: 'Sistem_Uptime', value: '99.9%', unit: 'Sinyal' }, 
        { label: 'Nöral_Bütünlük', value: 'Prime', unit: 'Mantık' } 
      ].map((stat, idx) => (
        <motion.div key={idx} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-slate-900/40 border border-slate-800 p-14 rounded-[4rem] hover:border-cyan-500/30 transition-all">
          <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.6em] mb-8">{stat.label}</h4>
          <div className="flex items-baseline gap-5">
            <span className="text-7xl font-black text-white tracking-tighter tabular-nums">{stat.value}</span>
            <span className="text-[13px] font-bold text-cyan-500/40 uppercase italic">{stat.unit}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// =========================================================================
// --- 3. MASTER_APPLICATION_LOGIC (EXACT VERSION) ---
// =========================================================================

function App() {
  const { user, profile, loading: authLoading } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('browse'); 
  const [mainTab, setMainTab] = useState('home'); 
  const [activeSub, setActiveSub] = useState('all'); 
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [review, setReview] = useState('');
  const [mediaReviews, setMediaReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [toast, setToast] = useState({ message: '', type: null });
  const [stats, setStats] = useState({ users: 0, reviews: 0, watchlist: 0 });
  const [trailerKey, setTrailerKey] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Content States
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
  const [trendingTV, setTrendingTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: null }), 3000);
  }, []);

  const fetchMedia = async (endpoint) => {
    if (!API_KEY) return [];
    try {
      // language=tr-TR: Özellikleri Türkçe çeker
      const fullUrl = `${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=tr-TR&include_adult=false`;
      const res = await fetch(fullUrl);
      const data = await res.json();
      
      const blacklist = ['porn', 'sex', 'erotic', 'adult', 'xxx', 'nudity', 'strip', 'prostitute', 'escort', 'hentai'];
      
      return (data.results || []).filter(m => {
        const title = (m.title || m.name || "").toLowerCase();
        const overview = (m.overview || "").toLowerCase();
        const hasBadWord = blacklist.some(word => title.includes(word) || overview.includes(word));
        return m.adult !== true && !hasBadWord;
      });
    } catch (error) { return []; }
  };

  useEffect(() => {
    const loadAllContent = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const [t, p, tr, u, a, sf, h, c, an, d, dr, m, ttv, trtv, ptv, sp] = await Promise.all([
          fetchMedia(`https://api.themoviedb.org/3/trending/movie/week`),
          fetchMedia(`https://api.themoviedb.org/3/movie/popular`),
          fetchMedia(`https://api.themoviedb.org/3/movie/top_rated`),
          fetchMedia(`https://api.themoviedb.org/3/movie/upcoming`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=28`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=87`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=27`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=35`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=16`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=99`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=18`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_genres=9648`),
          fetchMedia(`https://api.themoviedb.org/3/trending/tv/week`),
          fetchMedia(`https://api.themoviedb.org/3/tv/top_rated`),
          fetchMedia(`https://api.themoviedb.org/3/tv/popular`),
          fetchMedia(`https://api.themoviedb.org/3/discover/movie?with_keywords=6075`)
        ]);
        setTrending(t); setPopular(p); setTopRated(tr); setUpcoming(u); 
        setAction(a); setScifi(sf); setHorror(h); setComedy(c);
        setAnimation(an); setDocumentary(d); setDrama(dr); setMystery(m);
        setTrendingTV(ttv); setTopRatedTV(trtv); setPopularTV(ptv); setSports(sp);
        if (profile?.role === 'Admin') fetchStats();
      } catch (err) { showToast("Nöral_Senkronizasyon_Hatası", "error"); } finally { setLoading(false); }
    };
    loadAllContent();
  }, [user, profile]);

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
    const type = media.title ? 'movie' : 'tv';
    try {
      const response = await fetch(`https://api.themoviedb.org/3/${type}/${media.id}/videos?api_key=${API_KEY}`);
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
    const { data } = await supabase.from('reviews').select('*').eq('media_id', String(mediaId)).order('created_at', { ascending: false });
    setMediaReviews(data || []);
  };

  const fetchStats = useCallback(async () => {
    const { count: u } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    const { count: r } = await supabase.from('reviews').select('*', { count: 'exact', head: true });
    const { count: w } = await supabase.from('watchlists').select('*', { count: 'exact', head: true });
    setStats({ users: u || 0, reviews: r || 0, watchlist: w || 0 });
  }, []);

  const submitReview = async (mediaId) => {
    if (!review || !user) return;
    const { error } = await supabase.from('reviews').insert([{ media_id: String(mediaId), review_text: review, user_rating: rating, user_id: user.id }]);
    if (!error) { setReview(''); await fetchReviews(mediaId); showToast('Nöral_Algı_Enjekte_Edildi'); }
  };

  const addToWatchlist = async (m) => {
    if (watchlist.some(item => String(item.media_id) === String(m.id))) return showToast('Zaten_Kasada_Mevcut', 'error');
    const { error } = await supabase.from('watchlists').insert([{ 
      media_id: m.id, title: m.title || m.name, poster_path: m.poster_path, 
      vote_average: m.vote_average, user_id: user?.id, status: 'to_watch'
    }]);
    if (!error) { fetchWatchlist(); showToast('Nesne_Senkronize_Edildi'); }
  };

  const removeFromWatchlist = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) { fetchWatchlist(); showToast('Nesne_Kayıttan_Silindi', 'error'); }
  };

  useEffect(() => { if (user) fetchWatchlist(); }, [user, fetchWatchlist]);
  useEffect(() => { if (selectedMedia) { fetchReviews(selectedMedia.id); fetchTrailer(selectedMedia.id); } }, [selectedMedia]);

  if (authLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center font-black text-cyan-500 animate-pulse tracking-[1em]">BAŞLATILIYOR...</div>;

  const userAverage = mediaReviews.length > 0 ? (mediaReviews.reduce((acc, rev) => acc + rev.user_rating, 0) / mediaReviews.length).toFixed(1) : "0.0";

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex gap-8 opacity-[0.2] pointer-events-none skew-y-12 scale-150">
          {[1, 2, 3, 4, 5].map((col) => (
            <div key={col} className="flex-1 flex flex-col gap-8 animate-infinite-scroll">
              {fallbackMedia.map((movie, idx) => (
                <img key={idx} src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} className="w-full rounded-[3rem] shadow-2xl" />
              ))}
            </div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 bg-slate-900/90 p-20 rounded-[6rem] border border-slate-800 w-full max-w-lg text-center backdrop-blur-3xl shadow-2xl">
          <h2 className="text-8xl font-black tracking-tighter italic uppercase mb-20 text-white">Nova<span className="text-cyan-500">Stream</span></h2>
          <div className="space-y-8">
            <input type="email" placeholder="Kimlik..." value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-8 rounded-[2.5rem] text-white outline-none focus:border-cyan-500" />
            <input type="password" placeholder="Şifre..." value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-slate-800 p-8 rounded-[2.5rem] text-white outline-none focus:border-cyan-500" />
            <button onClick={async () => { const {error} = await supabase.auth.signInWithPassword({email, password}); if(error) showToast("Kimlik_Doğrulanamadı", "error"); }} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-8 rounded-[2.5rem] font-black uppercase shadow-3xl transition-all">Oturum_Aç</button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (profile?.role === 'Admin') return <AdminDashboard stats={stats} profile={profile} />;
  if (profile?.role === 'Staff') return <StaffDashboard />;

  const allSections = [
    { title: "İzlemeye_Devam_Et", data: watchlist.slice(0, 8), icon: <Clock size={20}/>, type: 'resume', category: 'all', sub: 'all', condition: watchlist.length > 0 },
    { title: "Haftalık_Popüler_Filmler", data: trending, icon: <Activity size={20}/>, category: 'movie', sub: 'all', condition: true },
    { title: "Popüler_Diziler", data: trendingTV, icon: <MonitorPlay size={20}/>, category: 'tv', sub: 'all', condition: true },
    { title: "Aksiyon_Sektörü", data: action, icon: <Sword size={20}/>, category: 'movie', sub: 'action', condition: true },
    { title: "Korku_Enjeksiyonları", data: horror, icon: <Skull size={20}/>, category: 'movie', sub: 'horror', condition: true },
    { title: "Dram_Sektörleri", data: drama, icon: <Heart size={20}/>, category: 'movie', sub: 'drama', condition: true },
    { title: "Belgesel_Dosyaları", data: documentary, icon: <BookOpen size={20}/>, category: 'doc', sub: 'all', condition: true },
    { title: "Canlı_Spor_Matrisi", data: sports, icon: <Trophy size={20}/>, category: 'sports', sub: 'all', condition: true },
    { title: "Bilim_Kurgu_Düğümleri", data: scifi, icon: <Cpu size={20}/>, category: 'movie', sub: 'scifi', condition: true },
    { title: "Komedi_Protokolleri", data: comedy, icon: <Laugh size={20}/>, category: 'movie', sub: 'comedy', condition: true },
    { title: "En_Yüksek_Puanlı_Diziler", data: topRatedTV, icon: <Award size={20}/>, category: 'tv', sub: 'all', condition: true }
  ];

  // Prime Filter Logic:
  const filteredSections = allSections.filter(s => {
    if (s.type === 'resume') return true;
    if (mainTab === 'home') {
       if (activeSub === 'all') return true;
       return s.sub === activeSub;
    }
    if (mainTab === 'movie') return s.category === 'movie' && (activeSub === 'all' || s.sub === activeSub);
    if (mainTab === 'tv') return s.category === 'tv' && (activeSub === 'all' || s.sub === activeSub);
    if (mainTab === 'sports') return s.category === 'sports';
    if (mainTab === 'doc') return s.category === 'doc';
    return false;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-40 selection:bg-cyan-500/20 selection:text-cyan-200">
      <AnimatePresence>{toast.message && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed bottom-12 right-12 z-[400] px-12 py-7 rounded-[2.5rem] border backdrop-blur-3xl shadow-3xl flex items-center gap-8 bg-cyan-500/10 border-cyan-500/20 text-cyan-400">
          <div className="w-3 h-3 rounded-full animate-ping bg-cyan-500" />
          <span className="text-[12px] font-black uppercase tracking-[0.4em] font-mono">{toast.message}</span>
        </motion.div>
      )}</AnimatePresence>

      <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur-3xl sticky top-0 z-[100]">
        <div className="px-16 py-8 flex justify-between items-center">
          <div className="flex items-center gap-16">
            <h1 className="text-5xl font-black italic tracking-tighter cursor-pointer group" onClick={() => {setMainTab('home'); setActiveSub('all'); setSearchQuery('');}}>
              Nova<span className="text-cyan-500">Stream</span>
            </h1>
            
            <div className="flex items-center gap-8">
              {[
                { id: 'home', label: 'Anasayfa' },
                { id: 'movie', label: 'Filmler' },
                { id: 'tv', label: 'Diziler' },
                { id: 'sports', label: 'Spor' },
                { id: 'doc', label: 'Belgesel' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => {setMainTab(tab.id); setActiveSub('all');}}
                  className={`text-[13px] font-black uppercase tracking-[0.2em] transition-all ${mainTab === tab.id ? 'text-white border-b-2 border-cyan-500 pb-2' : 'text-slate-600 hover:text-white'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-14 text-[12px] font-black uppercase tracking-[0.4em] text-slate-600 font-mono">
            <div className="relative group hidden xl:block">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-800" size={18} />
              <input type="text" placeholder="Sistemde Ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-900/50 border border-white/5 pl-14 pr-8 py-3 rounded-[1.5rem] text-[12px] outline-none focus:border-cyan-500 w-[250px] transition-all" />
            </div>
            <button onClick={() => setView('watchlist')} className={`hover:text-white flex items-center gap-4 ${view === 'watchlist' ? 'text-cyan-500' : ''}`}><Bookmark size={20} /> Kasa</button>
            <button onClick={() => setView('profile')} className={`hover:text-white flex items-center gap-4 ${view === 'profile' ? 'text-cyan-500' : ''}`}><User size={20} /> Profil</button>
            <button onClick={() => supabase.auth.signOut()} className="bg-slate-900 p-3 rounded-xl border border-white/5 hover:text-red-500"><LogOut size={20} /></button>
          </div>
        </div>

        {/* SUB-CATEGORY PILLS (Functional) */}
        {(mainTab === 'home' || mainTab === 'movie' || mainTab === 'tv') && (
          <div className="px-16 py-4 bg-black/20 flex items-center gap-4 overflow-x-auto no-scrollbar border-t border-white/[0.02]">
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest mr-4">Tür_Seç:</span>
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'action', label: 'Aksiyon' },
              { id: 'horror', label: 'Korku' },
              { id: 'drama', label: 'Dram' },
              { id: 'scifi', label: 'Bilim Kurgu' },
              { id: 'comedy', label: 'Komedi' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSub(sub.id)}
                className={`px-6 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest transition-all ${activeSub === sub.id ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20'}`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="p-16 max-w-[1900px] mx-auto">
        {searchQuery ? (
          <section className="animate-in fade-in duration-700">
            <h3 className="text-xl font-black italic text-white/90 mb-10 uppercase tracking-tighter">Arama_Sonuçları: <span className="text-cyan-500">"{searchQuery}"</span></h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-12">
              {searchResults.map((m) => (<div key={m.id} className="w-full"><MovieCard movie={m} onSelect={setSelectedMedia} onAdd={addToWatchlist} /></div>))}
            </div>
          </section>
        ) : view === 'browse' ? (
          <div className="space-y-40">
            {filteredSections.map((section, idx) => section.condition && (
              <section key={idx} className="relative px-6 group/row">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="h-6 w-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                      <h3 className="text-xl font-semibold text-white/90 uppercase tracking-tighter italic">{section.title.replace(/_/g, ' ')}</h3>
                   </div>
                   <div className="flex gap-4 opacity-0 group-hover/row:opacity-100 transition-all">
                     <button onClick={(e) => { e.currentTarget.closest('section').querySelector('.row-scroll').scrollBy({ left: -1000, behavior: 'smooth' }); }} className="p-5 bg-black border border-white/10 rounded-2xl text-white hover:bg-cyan-600 transition-all shadow-3xl z-50"><ChevronLeft size={28} /></button>
                     <button onClick={(e) => { e.currentTarget.closest('section').querySelector('.row-scroll').scrollBy({ left: 1000, behavior: 'smooth' }); }} className="p-5 bg-black border border-white/10 rounded-2xl text-white hover:bg-cyan-600 transition-all shadow-3xl z-50"><ChevronRight size={28} /></button>
                   </div>
                </div>
                <div className="row-scroll no-scrollbar flex flex-nowrap gap-16 overflow-x-auto scroll-smooth snap-x pb-12 px-4 relative z-10">
                  {section.data.map((movie) => (
                    <div key={movie.id} className="snap-start shrink-0 w-[240px] md:w-[280px] relative group">
                       <MovieCard movie={section.type === 'resume' ? {...movie, id: movie.media_id} : movie} onSelect={setSelectedMedia} onAdd={addToWatchlist} />
                       {section.type === 'resume' && <div className="absolute bottom-0 left-0 h-1.5 bg-cyan-600 w-3/4 rounded-full animate-pulse shadow-[0_0_15px_rgba(6,182,212,1)]" />}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : view === 'watchlist' ? (
          <div className="px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <h3 className="text-7xl font-black italic uppercase tracking-tighter text-white mb-24">Birim_Kasası</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-16">
              {watchlist.map((item) => (
                <div key={item.id} className="relative group bg-slate-900/40 rounded-[3rem] overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all shadow-3xl">
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="w-full aspect-[2/3] object-cover transition-all duration-1000" alt="" />
                  <button onClick={() => removeFromWatchlist(item.id)} className="absolute top-8 right-8 bg-red-600 p-6 rounded-[1.8rem] text-white opacity-0 group-hover:opacity-10 transition-all shadow-3xl hover:bg-red-500"><X size={28} /></button>
                </div>
              ))}
            </div>
          </div>
        ) : <ProfileView profile={profile} watchlist={watchlist} />}
      </main>

      <AnimatePresence>{selectedMedia && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 flex items-center justify-center p-6 md:p-12 z-[300] backdrop-blur-3xl" onClick={() => setSelectedMedia(null)}>
          <motion.div initial={{ scale: 0.95, y: 40 }} animate={{ scale: 1, y: 0 }} className="bg-[#050505] border border-white/10 max-w-[1400px] w-full flex flex-col lg:flex-row rounded-[3rem] overflow-hidden h-full max-h-[85vh] shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="w-full lg:w-[55%] relative bg-black flex flex-col border-r border-white/5 overflow-hidden">
              <div className="flex-1 bg-black flex items-center justify-center min-h-[300px]">
                {trailerKey ? (
                  <iframe src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`} className="w-full h-full border-0 z-10" allowFullScreen></iframe>
                ) : <Database size={80} className="text-cyan-500 opacity-20" />}
              </div>
              <div className="p-10 md:p-14 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                <div className="flex items-center gap-6 mb-6 font-mono text-[10px] font-bold uppercase text-slate-400">
                  <span className="bg-cyan-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"><Star size={14} fill="white" /> {selectedMedia.vote_average?.toFixed(1)}</span>
                  <span>{selectedMedia.release_date?.split('-')[0] || selectedMedia.first_air_date?.split('-')[0]}</span>
                  <span className="border-l border-white/10 pl-6">{selectedMedia.original_language?.toUpperCase()}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase text-white tracking-tight leading-[1.1]">{selectedMedia.title || selectedMedia.name}</h2>
                <p className="text-white/70 text-[14px] leading-relaxed font-medium line-clamp-3 border-l-4 border-cyan-600/30 pl-6">{selectedMedia.overview}</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
              <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-2xl">
                 <div className="flex flex-col gap-1">
                    <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] flex items-center gap-3"><MessageSquare size={16} className="text-cyan-500" /> Nöral_Feed</h4>
                    <p className="text-[9px] text-cyan-500/50 font-mono animate-pulse">Senkronizasyon_Tamamlandı</p>
                 </div>
                 <div className="text-right">
                    <span className="text-4xl font-black text-white tabular-nums">{userAverage}</span>
                    <p className="text-[9px] font-bold text-cyan-500/40 uppercase tracking-[0.3em]">Küresel_Ort</p>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-6 no-scrollbar">
                {mediaReviews.length > 0 ? mediaReviews.map((rev, idx) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-[2rem] hover:border-cyan-500/30 transition-all">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] font-black text-cyan-500 uppercase tracking-[0.2em]">UNIT_{rev.user_id?.slice(0, 8)}</span>
                      <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < rev.user_rating ? "fill-cyan-500 text-cyan-500" : "text-white/10"} />)}</div>
                    </div>
                    <p className="text-white/80 text-[14px]">"{rev.review_text}"</p>
                  </motion.div>
                )) : <div className="h-full flex flex-col items-center justify-center opacity-20 gap-6"><Activity size={60} className="animate-pulse text-cyan-500" /><span className="text-xs font-black uppercase tracking-[0.5em]">Sinyal_Kaydedilmedi</span></div>}
              </div>
              <div className="p-8 md:p-10 bg-slate-950/95 border-t border-white/5">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Etki_Atayın:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setRating(n)} className={`w-10 h-10 rounded-xl border text-[14px] font-black transition-all ${rating >= n ? 'bg-cyan-600 border-cyan-500 text-white shadow-3xl' : 'bg-transparent border-white/10 text-slate-500'}`}>{n}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <input value={review} onChange={(e) => setReview(e.target.value)} placeholder="Algı verisi girin..." className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 rounded-[1.5rem] text-[13px] text-white outline-none focus:border-cyan-500/50 transition-all font-mono" />
                  <button onClick={() => submitReview(selectedMedia.id)} className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase transition-all">İlet</button>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedMedia(null)} className="absolute top-6 right-6 text-white/40 hover:text-white transition-all z-[110] bg-black/80 p-3 rounded-full border border-white/10 hover:bg-cyan-600 hover:rotate-90 duration-300"><X size={24} /></button>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
    </div>
  );
}

export default App;