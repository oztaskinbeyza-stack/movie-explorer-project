import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function MovieCard({ movie, onSelect, onAdd }) {
  const getPosterUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group bg-slate-900/40 rounded-[2rem] overflow-hidden border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 shadow-3xl cursor-pointer w-full"
      onClick={() => onSelect(movie)}
    >
      <img
        src={getPosterUrl(movie.poster_path)}
        className="w-full aspect-[2/3] object-cover transition-transform duration-700 group-hover:scale-110" 
        alt={movie.title}
        loading="lazy"
      />
      
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20 flex items-center gap-2">
        <Star size={12} className="fill-cyan-500 text-cyan-500" />
        <span className="text-[10px] font-mono text-white">{movie.vote_average?.toFixed(1)}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10">
        <p className="text-[12px] font-black uppercase text-white truncate italic tracking-tight">
          {movie.title}
        </p>
      </div>
    </motion.div>
  );
}