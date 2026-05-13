import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Plus } from 'lucide-react';
import { useState } from 'react';

export default function MovieCard({ movie, onSelect, onAdd }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group bg-slate-900/40 rounded-[2rem] overflow-hidden border border-slate-800 transition-all duration-300 shadow-3xl hover:border-cyan-500/50 cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(movie)}
    >
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
        className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        alt={movie.title}
      />
      
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20 flex items-center gap-2">
        <Star size={12} className="fill-cyan-500 text-cyan-500" />
        <span className="text-[10px] font-mono text-white">{movie.vote_average?.toFixed(1)}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10">
        <p className="text-[12px] font-black uppercase text-white truncate italic tracking-tight">{movie.title}</p>
      </div>
    </motion.div>
  );
}