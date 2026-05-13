import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Eye, EyeOff, Clock, MessageSquare, Award, BarChart3,
  Film, Tv, Trash2, CheckCircle, ChevronRight, Activity,
  User, Calendar, TrendingUp, Zap, Layers, X, Settings, Shield, Lock, Key, BellRing, Smartphone, Check
} from 'lucide-react';

const ProfilePage = ({ profile, user, initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [toWatch, setToWatch] = useState([]);
  const [watched, setWatched] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Settings States
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: profile?.full_name || profile?.email?.split('@')[0] || 'Nova Member',
    bio: 'Cinema enthusiast, fan of sci-fi thrillers and timeless classics.',
    privacy: 'public',
    twoFactor: true,
    hideHistory: false,
    emailAlerts: true
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const fetchProfileData = useCallback(async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      const [watchlistRes, reviewsRes] = await Promise.all([
        supabase.from('watchlists').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('reviews').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);
      const allWatchlist = watchlistRes.data || [];
      setToWatch(allWatchlist.filter(i => i.status === 'to_watch'));
      setWatched(allWatchlist.filter(i => i.status === 'watched'));
      setUserReviews(reviewsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  useEffect(() => { fetchProfileData(); }, [fetchProfileData]);

  const markAsWatched = async (item) => {
    const { error } = await supabase.from('watchlists').update({ status: 'watched' }).eq('id', item.id);
    if (!error) fetchProfileData();
  };

  const markAsToWatch = async (item) => {
    const { error } = await supabase.from('watchlists').update({ status: 'to_watch' }).eq('id', item.id);
    if (!error) fetchProfileData();
  };

  const removeItem = async (id) => {
    const { error } = await supabase.from('watchlists').delete().eq('id', id);
    if (!error) fetchProfileData();
  };

  // Stats
  const totalReviews = userReviews.length;
  const avgRating = totalReviews > 0
    ? (userReviews.reduce((a, r) => a + (r.user_rating || 0), 0) / totalReviews).toFixed(1)
    : '0.0';
  const highestRated = totalReviews > 0 ? Math.max(...userReviews.map(r => r.user_rating || 0)) : 0;
  const totalWatchlist = toWatch.length + watched.length;
  const joinDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={16} /> },
    { id: 'towatch', label: `Watchlist (${toWatch.length})`, icon: <Clock size={16} /> },
    { id: 'watched', label: `Watched (${watched.length})`, icon: <Eye size={16} /> },
    { id: 'reviews', label: `Reviews (${totalReviews})`, icon: <MessageSquare size={16} /> },
    { id: 'settings', label: 'Settings & Privacy', icon: <Settings size={16} /> },
  ];

  const statCards = [
    { label: 'To Watch', value: toWatch.length, icon: <Clock size={28} />, color: 'from-amber-500 to-orange-600', border: 'border-amber-500/20' },
    { label: 'Watched Movies', value: watched.length, icon: <Eye size={28} />, color: 'from-emerald-500 to-green-600', border: 'border-emerald-500/20' },
    { label: 'Total Reviews', value: totalReviews, icon: <MessageSquare size={28} />, color: 'from-violet-500 to-purple-600', border: 'border-violet-500/20' },
    { label: 'Avg Rating', value: avgRating, icon: <Star size={28} />, color: 'from-cyan-500 to-blue-600', border: 'border-cyan-500/20' },
  ];

  const renderMediaCard = (item, type) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-500"
    >
      <div className="relative">
        <img
          src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700"
          alt={item.title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
          <Star size={10} className="fill-cyan-500 text-cyan-500" />
          <span className="text-[10px] font-mono text-white">{item.vote_average?.toFixed(1)}</span>
        </div>

        {/* Hover actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {type === 'towatch' && (
            <button
              onClick={() => markAsWatched(item)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
            >
              <CheckCircle size={14} /> Watched
            </button>
          )}
          {type === 'watched' && (
            <button
              onClick={() => markAsToWatch(item)}
              className="flex-1 bg-amber-600 hover:bg-amber-500 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
            >
              <Clock size={14} /> Watch Again
            </button>
          )}
          <button
            onClick={() => removeItem(item.id)}
            className="bg-red-600/80 hover:bg-red-500 text-white p-2.5 rounded-xl transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[12px] font-bold text-white truncate">{item.title}</p>
      </div>
    </motion.div>
  );

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-40">
        <Activity size={48} className="text-cyan-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 py-10">
      {/* Profile Header */}
      <div className="relative bg-slate-900/50 border border-slate-800 rounded-3xl p-10 mb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
          <div className="w-28 h-28 bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-700 rounded-3xl flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-cyan-500/20 border-2 border-white/10">
            {profile?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="text-center lg:text-left flex-1">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em]">Online</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white mb-2">{profile?.email?.split('@')[0]}</h2>
            <p className="text-sm text-slate-500 mb-4">{profile?.email}</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                <User size={12} /> {profile?.role || 'User'}
              </span>
              <span className="bg-slate-800/60 text-slate-400 border border-slate-700 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider flex items-center gap-2">
                <Calendar size={12} /> {joinDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-slate-900/50 border ${stat.border} rounded-2xl p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}
          >
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${stat.color} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity`} />
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white tracking-tight tabular-nums">{stat.value}</div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-[12px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeTab === tab.id
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/5'
                : 'bg-slate-900/30 border-slate-800 text-slate-500 hover:text-white hover:border-slate-700'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
            {/* Rating Distribution */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp size={20} className="text-cyan-500" /> Rating Distribution
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(score => {
                  const count = userReviews.filter(r => r.user_rating === score).length;
                  const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={score} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-16 justify-end">
                        <span className="text-sm font-bold text-white">{score}</span>
                        <Star size={14} className="fill-cyan-500 text-cyan-500" />
                      </div>
                      <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        />
                      </div>
                      <span className="text-[12px] font-mono text-slate-500 w-12 text-right">{count} ({pct.toFixed(0)}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent To Watch */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2"><Clock size={16} className="text-amber-500" /> Recent Watchlist</h4>
                  <button onClick={() => setActiveTab('towatch')} className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider hover:text-cyan-400 flex items-center gap-1">
                    See All <ChevronRight size={14} />
                  </button>
                </div>
                {toWatch.length === 0 ? (
                  <p className="text-slate-600 text-sm py-6 text-center">No movies added yet</p>
                ) : (
                  <div className="space-y-2">
                    {toWatch.slice(0, 5).map(item => (
                      <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
                        <img src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} className="w-10 h-14 object-cover rounded-lg" alt="" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{item.title}</p>
                          <div className="flex items-center gap-1">
                            <Star size={10} className="fill-cyan-500 text-cyan-500" />
                            <span className="text-[11px] text-slate-500">{item.vote_average?.toFixed(1)}</span>
                          </div>
                        </div>
                        <button onClick={() => markAsWatched(item)} className="text-emerald-500 hover:bg-emerald-500/10 p-2 rounded-lg transition-colors" title="Mark as Watched">
                          <CheckCircle size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Reviews */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2"><MessageSquare size={16} className="text-violet-500" /> Recent Reviews</h4>
                  <button onClick={() => setActiveTab('reviews')} className="text-[10px] text-cyan-500 font-bold uppercase tracking-wider hover:text-cyan-400 flex items-center gap-1">
                    See All <ChevronRight size={14} />
                  </button>
                </div>
                {userReviews.length === 0 ? (
                  <p className="text-slate-600 text-sm py-6 text-center">No reviews written yet</p>
                ) : (
                  <div className="space-y-2">
                    {userReviews.slice(0, 5).map((rev, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-800/30 border border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold text-slate-400">Media #{rev.media_id}</span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={10} className={i < rev.user_rating ? "fill-cyan-500 text-cyan-500" : "text-slate-700"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[13px] text-white/80 line-clamp-2">"{rev.review_text}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Extra Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Highest Rating', value: highestRated > 0 ? `${highestRated}/5` : '-', icon: <Award size={18} className="text-amber-500" /> },
                { label: 'Total Watchlisted', value: totalWatchlist, icon: <Layers size={18} className="text-purple-500" /> },
                { label: 'Completion Rate', value: totalWatchlist > 0 ? `${((watched.length / totalWatchlist) * 100).toFixed(0)}%` : '0%', icon: <TrendingUp size={18} className="text-emerald-500" /> },
                { label: 'Active Targets', value: toWatch.length, icon: <Zap size={18} className="text-cyan-500" /> },
              ].map((s, i) => (
                <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 text-center hover:border-slate-700 transition-colors">
                  <div className="flex justify-center mb-2">{s.icon}</div>
                  <div className="text-xl font-black text-white">{s.value}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'towatch' && (
          <motion.div key="towatch" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {toWatch.length === 0 ? (
              <div className="text-center py-20">
                <EyeOff size={48} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">Your watchlist is empty</p>
                <p className="text-slate-700 text-sm mt-1">Start by exploring movies from the browse page</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {toWatch.map(item => renderMediaCard(item, 'towatch'))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'watched' && (
          <motion.div key="watched" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {watched.length === 0 ? (
              <div className="text-center py-20">
                <Eye size={48} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No watched movies yet</p>
                <p className="text-slate-700 text-sm mt-1">Mark movies as watched from your watchlist</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {watched.map(item => renderMediaCard(item, 'watched'))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'reviews' && (
          <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {userReviews.length === 0 ? (
              <div className="text-center py-20">
                <MessageSquare size={48} className="text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">No reviews written yet</p>
                <p className="text-slate-700 text-sm mt-1">Select any movie and share your thoughts</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userReviews.map((rev, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/20 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Film size={16} className="text-cyan-500" />
                        <span className="text-sm font-bold text-white">Media #{rev.media_id}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < rev.user_rating ? "fill-cyan-500 text-cyan-500" : "text-slate-700"} />
                          ))}
                        </div>
                        <span className="text-sm font-black text-cyan-500">{rev.user_rating}/5</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-[14px] leading-relaxed border-l-2 border-cyan-500/30 pl-4">"{rev.review_text}"</p>
                    <div className="mt-3 text-[11px] text-slate-600">
                      {rev.created_at ? new Date(rev.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-10 max-w-4xl mx-auto">
            {saveSuccess && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center gap-3 font-bold text-sm animate-in fade-in duration-300">
                <CheckCircle size={20} /> Your settings and privacy preferences have been successfully updated.
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-10">
              {/* PROFILE INFO SECTION */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <User className="text-cyan-500" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-white">Profile Information</h3>
                    <p className="text-xs text-slate-400">Update your display name and personal biography</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
                    <input 
                      type="text" 
                      value={profileForm.name} 
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-500 transition-all font-medium" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input 
                      type="email" 
                      disabled 
                      value={user?.email || 'user@novastream.app'} 
                      className="w-full bg-slate-950/40 border border-slate-900 rounded-xl px-4 py-3 text-slate-500 text-sm outline-none cursor-not-allowed font-medium" 
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">Email address cannot be changed for security reasons</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Biography</label>
                  <textarea 
                    rows={3}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-white text-sm outline-none focus:border-cyan-500 transition-all font-medium resize-none"
                  />
                </div>
              </div>

              {/* PRIVACY & SECURITY SECTION */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <Shield className="text-purple-500" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-white">Privacy & Security</h3>
                    <p className="text-xs text-slate-400">Manage your account protection and data visibility</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Profile Visibility</label>
                    <select 
                      value={profileForm.privacy}
                      onChange={(e) => setProfileForm({...profileForm, privacy: e.target.value})}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-purple-500 transition-all font-medium w-full md:w-1/2"
                    >
                      <option value="public">Public (Visible in Community Reviews)</option>
                      <option value="friends">Mutual Friends Only</option>
                      <option value="private">Strictly Private (Anonymous Mode)</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400"><Lock size={20} /></div>
                      <div>
                        <p className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</p>
                        <p className="text-xs text-slate-400">Require SMS or Authenticator app approval for unknown logins</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setProfileForm({...profileForm, twoFactor: !profileForm.twoFactor})}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${profileForm.twoFactor ? 'bg-purple-600' : 'bg-slate-800'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${profileForm.twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400"><EyeOff size={20} /></div>
                      <div>
                        <p className="text-sm font-bold text-white">Hide Activity History</p>
                        <p className="text-xs text-slate-400">Prevent your watched content from appearing in public feeds</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setProfileForm({...profileForm, hideHistory: !profileForm.hideHistory})}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${profileForm.hideHistory ? 'bg-cyan-500' : 'bg-slate-800'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${profileForm.hideHistory ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* NOTIFICATION PREFERENCES SECTION */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <BellRing className="text-amber-500" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-white">Notification Preferences</h3>
                    <p className="text-xs text-slate-400">Choose which topics and alerts you wish to receive updates for</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400"><Smartphone size={20} /></div>
                    <div>
                      <p className="text-sm font-bold text-white">New Releases & AI Tailored Alerts</p>
                      <p className="text-xs text-slate-400">Get instant alerts for new Ultra HD releases and personalized recommendations</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setProfileForm({...profileForm, emailAlerts: !profileForm.emailAlerts})}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${profileForm.emailAlerts ? 'bg-amber-500' : 'bg-slate-800'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${profileForm.emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex justify-end pt-4">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Check size={16} /> Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
