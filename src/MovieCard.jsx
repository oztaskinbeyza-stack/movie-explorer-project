import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Plus, Calendar, Globe } from 'lucide-react';

const MovieCard = ({ movie, onSelect, onAdd }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl flex flex-col h-full"
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        {posterUrl ? (
          <img 
            src={posterUrl} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
            alt="" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <Database size={40} className="text-slate-800" />
        )}
        
        {/* Puan Rozeti */}
        <div className="absolute top-5 right-5 z-30 bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-2xl flex items-center gap-2">
          <Star size={12} className="text-cyan-400 fill-cyan-400" />
          <span className="text-[11px] font-black text-white font-mono tabular-nums">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-white tracking-tight leading-tight line-clamp-1 mb-3 group-hover:text-cyan-400 transition-colors uppercase italic">
          {movie.title}
        </h3>

        <div className="flex items-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-6 mt-auto">
          <span className="flex items-center gap-1.5">
            <Calendar size={10} className="text-slate-600" /> 
            {movie.release_date ? movie.release_date.split('-')[0] : "2026"}
          </span>
          <span className="flex items-center gap-1.5 border-l border-white/10 pl-4">
            <Globe size={10} className="text-slate-600" /> 
            {movie.original_language ? movie.original_language.toUpperCase() : "EN"}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-white text-black hover:bg-cyan-500 hover:text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
            <Play size={12} fill="currentColor" /> View_Data
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(movie); }}
            className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl border border-white/5 transition-all"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;