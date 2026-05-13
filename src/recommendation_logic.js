/**
 * NOVASTREAM SOPHISTICATED RECOMMENDATION ENGINE (MOCK)
 * 
 * Logic: Calculates relevance scores based on user viewing history (watchlist),
 * genre preferences (highly rated genres), and global popularity.
 */

export const getSophisticatedRecommendations = (watchlist, allMovies, ratings) => {
  // 0. Deduplicate input movies
  const seenIds = new Set();
  const uniqueAllMovies = allMovies.filter(m => {
    if (!m || !m.id || seenIds.has(m.id)) return false;
    seenIds.add(m.id);
    return true;
  });

  if (!watchlist || watchlist.length === 0) {
    // Cold start: return top trending
    return uniqueAllMovies.slice(0, 10);
  }

  // 1. Identify User Genre Preferences
  const genreWeights = {};
  watchlist.forEach(item => {
    if (item.genres) {
      item.genres.forEach(g => {
        genreWeights[g.id] = (genreWeights[g.id] || 0) + 1;
      });
    }
  });

  // 2. Adjust Weights by Ratings
  ratings.forEach(r => {
    if (r.rating >= 4 && r.genres) {
      r.genres.forEach(g => {
        genreWeights[g.id] = (genreWeights[g.id] || 0) + 2; // High ratings weigh more
      });
    }
  });

  // 3. Score All Movies
  const scoredMovies = uniqueAllMovies.map(movie => {
    let score = movie.vote_average || 0;
    
    // Add genre bonus
    if (movie.genre_ids) {
      movie.genre_ids.forEach(gid => {
        if (genreWeights[gid]) {
          score += (genreWeights[gid] * 0.5);
        }
      });
    }

    // Recency bonus
    const year = parseInt(movie.release_date?.split('-')[0]) || 2000;
    if (year > 2020) score += 1;

    return { ...movie, recommendation_score: score };
  });

  // 4. Sort and Filter Out Already Watched
  const watchedIds = new Set(watchlist.map(i => String(i.media_id)));
  return scoredMovies
    .filter(m => !watchedIds.has(String(m.id)))
    .sort((a, b) => b.recommendation_score - a.recommendation_score);
};
