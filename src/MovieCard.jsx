import { motion } from 'framer-motion';
import { Star, Play, Plus, Info, ShieldCheck } from 'lucide-react';

export default function MovieCard({ movie, onSelect, onAdd }) {
  const getPosterUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    if (path.startsWith('http')) return path;
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const getYear = () => {
    const date = movie.release_date || movie.first_air_date;
    return date ? date.split('-')[0] : '';
  };

  return (
    <motion.div
      className="relative group rounded-xl overflow-hidden cursor-pointer w-full aspect-[2/3] bg-slate-900 border border-white/5"
      whileHover={{ scale: 1.20, zIndex: 100, y: -12, boxShadow: "0 30px 60px -15px rgba(6, 182, 212, 0.35)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(movie)}
      style={{ willChange: 'transform' }}
    >
      {/* Base Poster */}
      <img
        src={getPosterUrl(movie.poster_path)}
        className="w-full h-full object-cover"
        alt={movie.title || movie.name}
        loading="lazy"
      />

      {/* Prime-style Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">

        <h4 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2">
          {movie.title || movie.name}
        </h4>

        <div className="flex items-center gap-1.5 mb-3 text-cyan-400">
          <ShieldCheck size={12} />
          <span className="text-[9px] font-bold uppercase tracking-wider">Included with Nova</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mb-3">
          <button
            className="flex-1 bg-white hover:bg-gray-200 text-black py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors"
            onClick={(e) => { e.stopPropagation(); onSelect(movie); }}
          >
            <Play size={12} className="fill-black" />
            <span className="text-[10px] font-bold">Play</span>
          </button>
          <button
            className="w-8 h-8 rounded-full border-2 border-white/40 hover:border-white text-white flex items-center justify-center transition-colors bg-white/10 backdrop-blur-md shrink-0"
            onClick={(e) => { e.stopPropagation(); onSelect(movie); }}
            title="Details"
          >
            <Info size={14} />
          </button>
          <button
            className="w-8 h-8 rounded-full border-2 border-white/40 hover:border-white text-white flex items-center justify-center transition-colors bg-white/10 backdrop-blur-md shrink-0"
            onClick={(e) => { e.stopPropagation(); onAdd(movie); }}
            title="Add to Watchlist"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-2 text-[10px] font-medium text-slate-300 mb-2">
          <span className="bg-white/10 px-1.5 py-0.5 rounded text-white">{movie.adult ? '18+' : '13+'}</span>
          <span>{getYear()}</span>
          <span className="flex items-center gap-1 text-yellow-500"><Star size={10} className="fill-yellow-500" /> {movie.vote_average?.toFixed(1)}</span>
        </div>

        {/* Overview Snippet */}
        <p className="text-[9px] text-slate-400 line-clamp-3 leading-relaxed">
          {movie.overview || "No synopsis available."}
        </p>

      </div>
    </motion.div>
  );
}