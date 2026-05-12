import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Plus, CalendarDays, Info } from 'lucide-react';

const MovieCard = ({ movie, onSelect, onAdd }) => {
  const posterUrl = movie.poster_path 
    ? `https://images.weserv.nl/?url=https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Data_Stream_Offline';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative bg-slate-900 border border-slate-800/60 rounded-none overflow-hidden cursor-pointer shadow-2xl hover:border-purple-500/50 transition-colors duration-500"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)" }}
    >
      <div className="absolute top-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/60 backdrop-blur-md border border-purple-500/30 px-2 py-1 flex items-center gap-1.5 rounded-sm">
          <CalendarDays size={10} className="text-purple-400" />
          <span className="text-[8px] font-black text-white uppercase tracking-tighter">
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </span>
        </div>
      </div>

      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={posterUrl} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/500x750?text=Data_Offline'; }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
          alt={movie.title}
          onClick={() => onSelect(movie)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 z-10 pointer-events-none" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        {/* Puan ve Metadata */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Star size={10} className="text-purple-500 fill-purple-500 animate-pulse" />
            <span className="text-[9px] font-black text-purple-400 uppercase tracking-[0.2em] font-mono">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"} <span className="text-slate-600">SYS_SCORE</span>
            </span>
          </div>
          <span className="text-[8px] text-slate-500 font-bold border border-slate-800 px-1 rounded-sm uppercase">
            {movie.original_language || 'EN'}
          </span>
        </div>
        
        <h3 className="text-sm md:text-base font-black text-white italic uppercase leading-tight tracking-tighter mb-4 truncate group-hover:text-purple-400 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={() => onSelect(movie)}
            className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2.5 font-black text-[9px] uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-600/20"
          >
            <Play size={10} fill="white" /> Execute_Node
          </button>
          
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onAdd(movie); 
            }}
            className="px-3 border border-slate-700 text-slate-400 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all active:scale-95"
            title="Add to Vault"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  );
};

export default MovieCard;