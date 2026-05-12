import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Plus } from 'lucide-react';

const MovieCard = ({ movie, onSelect, onAdd }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=NO_SIGNAL';

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-2xl flex flex-col w-full h-full"
      onClick={() => onSelect(movie)}
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img 
          src={posterUrl} 
          className="group-hover:scale-110" // index.css'deki transition burada devreye girer
          alt="" 
        />
        <div className="absolute top-3 right-3 z-30 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
          <Star size={10} className="text-cyan-400 fill-cyan-400" />
          <span className="text-[10px] font-bold text-white font-mono">
            {movie.vote_average?.toFixed(1) || "0.0"}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-[11px] font-bold text-white tracking-tight leading-tight line-clamp-1 uppercase italic">
          {movie.title}
        </h3>
        <div className="flex gap-1.5">
          <button className="flex-1 bg-white text-black hover:bg-cyan-500 hover:text-white py-2 rounded-xl text-[9px] font-black uppercase transition-all flex items-center justify-center gap-1">
            <Play size={10} fill="currentColor" /> View
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(movie); }}
            className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl border border-white/5"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;