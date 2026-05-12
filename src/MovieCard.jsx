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
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-2xl flex flex-col w-[160px] md:w-[220px] h-full shrink-0"
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img src={posterUrl} className="group-hover:scale-110" alt="" />
        <div className="absolute top-2 right-2 z-30 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1 border border-white/10">
          <Star size={8} className="text-cyan-400 fill-cyan-400" />
          <span className="text-[9px] font-bold text-white font-mono">{movie.vote_average?.toFixed(1) || "0.0"}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-[10px] font-bold text-white tracking-tight line-clamp-1 uppercase italic">{movie.title}</h3>
        <div className="flex gap-1">
          <button className="flex-1 bg-white text-black hover:bg-cyan-500 hover:text-white py-1.5 rounded-lg text-[8px] font-black uppercase transition-all flex items-center justify-center gap-1">
            <Play size={8} fill="currentColor" /> View
          </button>
          <button onClick={(e) => { e.stopPropagation(); onAdd(movie); }} className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-400 rounded-lg border border-white/5"><Plus size={12} /></button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;