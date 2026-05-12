import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Plus } from 'lucide-react';

const MovieCard = ({ movie, onSelect, onAdd }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=NO_SIGNAL';

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl flex flex-col w-[180px] md:w-[240px] h-full shrink-0"
      onClick={() => onSelect(movie)}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
        <img src={posterUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
        
        <div className="absolute top-3 right-3 z-30 bg-black/70 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1.5 border border-white/10">
          <Star size={10} className="text-cyan-400 fill-cyan-400" />
          <span className="text-[10px] font-black text-white font-mono">
            {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <h3 className="text-[11px] font-black text-white tracking-tight line-clamp-1 uppercase italic">
          {movie.title}
        </h3>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-white text-black hover:bg-cyan-500 hover:text-white py-2 rounded-xl text-[9px] font-black uppercase transition-all flex items-center justify-center gap-2">
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