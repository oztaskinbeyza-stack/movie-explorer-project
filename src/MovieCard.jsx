import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Plus, Calendar, Globe } from 'lucide-react';

const MovieCard = ({ movie, onSelect, onAdd }) => {
  const posterUrl = movie.poster_path 
    ? `https://images.weserv.nl/?url=https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Data_Offline';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative bg-slate-900/40 border border-slate-800/50 rounded-[2rem] overflow-hidden cursor-pointer shadow-xl hover:border-cyan-500/30 transition-all duration-500"
      onClick={() => onSelect(movie)}
    >
      {/* Resim Katmanı */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={posterUrl} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
          alt={movie.title}
        />
        
        {/* Profesyonel Puan Rozeti */}
        <div className="absolute top-4 left-4 z-30 bg-slate-950/80 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-2xl flex items-center gap-2">
          <Star size={12} className="text-cyan-400 fill-cyan-400" />
          <span className="text-[11px] font-black text-white font-mono tabular-nums">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
          </span>
        </div>

        {/* Gradyan Katmanı */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 z-10" />
      </div>

      {/* İçerik Alanı */}
      <div className="p-6 relative z-20">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-bold text-slate-100 tracking-tight leading-tight line-clamp-1 group-hover:text-cyan-400 transition-colors">
            {movie.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-5">
          <span className="flex items-center gap-1"><Calendar size={10} /> {movie.release_date?.split('-')[0]}</span>
          <span className="flex items-center gap-1"><Globe size={10} /> {movie.original_language?.toUpperCase()}</span>
        </div>
        
        {/* Aksiyon Butonları */}
        <div className="flex gap-2">
          <button 
            className="flex-1 bg-cyan-600/10 hover:bg-cyan-600 text-cyan-400 hover:text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-cyan-500/20"
          >
            <Play size={12} fill="currentColor" /> View_Data
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(movie); }}
            className="p-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-700/50 transition-all"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;