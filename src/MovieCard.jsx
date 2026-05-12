import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Plus, Share2, Info, ThumbsUp } from 'lucide-react';

export default function MovieCard({ movie, onSelect, onAdd }) {
  const [isHovered, setIsHovered] = useState(false);
  const genres = movie.genres ? movie.genres.join(', ') : 'Türü Bilinmiyor';
  const cast = movie.cast ? movie.cast.join(', ') : 'Oyuncular Bilinmiyor';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Bilinmiyor';

  return (
    <motion.div
      className="relative group bg-slate-900/40 rounded-[2rem] overflow-hidden border border-slate-800 transition-all duration-300 shadow-3xl hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(movie)}
      layout
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className={`w-full aspect-[2/3] object-cover transition-all duration-300 grayscale group-hover:grayscale-0 ${isHovered ? 'scale-100' : 'scale-[1.1]'}`}
        alt={movie.title}
      />
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full border border-white/5 z-10">
        <Star size={14} className="fill-cyan-500 text-cyan-500" />
        <span className="text-[10px] font-mono text-slate-500 tracking-tighter">{movie.vote_average?.toFixed(1)}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-100 z-10">
        <p className="text-[12px] font-black uppercase text-white truncate italic tracking-tighter leading-none">{movie.title}</p>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-[#0A0A0A] p-8 rounded-b-[2rem] border border-t-0 border-slate-800 z-20 shadow-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-black uppercase text-white truncate italic tracking-tighter leading-none">{movie.title}</p>
                <div className="flex gap-4">
                  <Play size={20} className="text-cyan-500" />
                  <Plus size={20} className="text-cyan-500" />
                </div>
              </div>
              <div className="flex items-center gap-6 font-mono text-[10px] text-slate-500">
                <span>{releaseYear}</span>
                <span className="bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">Prime'a Dahil</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-tight line-clamp-3 leading-relaxed">
                {movie.overview}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}