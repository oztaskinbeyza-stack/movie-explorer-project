export const filterMovies = (movies, minRating = 0) => {
  return movies.filter((movie) => movie.vote_average >= minRating);
};

export const searchMoviesByTitle = (movies, query) => {
  if (!query) return movies;
  return movies.filter((movie) => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const getRecommendations = (allMovies, watchlist) => {
  if (!watchlist || watchlist.length === 0) {
    return allMovies
      .sort((a, b) => b.vote_average - a.vote_average)
      .slice(0, 5);
  }

  const watchlistIds = watchlist.map((m) => m.id);
  const averageRating = watchlist.reduce((sum, m) => sum + m.vote_average, 0) / watchlist.length;

  return allMovies
    .filter((movie) => !watchlistIds.includes(movie.id) && movie.vote_average >= averageRating - 1)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 5);
};
