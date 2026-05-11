import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Plus } from 'lucide-react';

const MovieCard = ({ movie, onSelect, onAdd }) => {
  // Resimlerin engellenmemesi için proxy URL'ini burada hazırlıyoruz
  const posterUrl = movie.poster_path 
    ? `https://images.weserv.nl/?url=https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Data';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="group relative bg-black border border-slate-800 rounded-none overflow-hidden cursor-pointer"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)" }}
    >
      {/* Karanlık Gradyan Efekti */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-10 pointer-events-none" />
      
      {/* Film Afişi */}
      <img 
        src={posterUrl} 
        onError={(e) => { 
          e.target.src = 'https://via.placeholder.com/500x750?text=Data_Stream_Offline'; 
        }}
        className="w-full aspect-[2/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
        alt={movie.title}
        onClick={() => onSelect(movie)}
      />

      {/* Alt Bilgi Alanı */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <div className="flex items-center gap-2 mb-2">
          <Star size={12} className="text-purple-500 fill-purple-500" />
          <span className="text-[9px] font-black text-purple-400 uppercase tracking-[0.3em]">
            {/* toFixed hatasını önlemek için kontrol ekledik */}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"} DATA_SCORE
          </span>
        </div>
        
        <h3 className="text-lg font-black text-white italic uppercase leading-none tracking-tighter mb-4 truncate">
          {movie.title}
        </h3>
        
        {/* Butonlar - Hover durumunda görünür */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => onSelect(movie)}
            className="flex-1 bg-purple-600 text-white py-3 font-black text-[9px] uppercase flex items-center justify-center gap-2 hover:bg-purple-500 transition-all"
          >
            <Play size={12} fill="white" /> Execute
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); // Kartın tıklanma olayını (modal açılmasını) engelle
              onAdd(movie); 
            }}
            className="p-3 border border-slate-700 text-slate-400 hover:text-white hover:border-purple-500 transition-all"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;