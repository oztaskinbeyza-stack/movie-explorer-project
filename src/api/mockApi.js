export const mockDatabase = [
  { id: 101, title: "The Dark Knight", genre: "Action", vote_average: 9.0, poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 102, title: "Inception", genre: "Sci-Fi", vote_average: 8.8, poster_path: "/9gk7adHYeDvHkYSBsmkZwtBJu5H.jpg" },
  { id: 103, title: "Interstellar", genre: "Sci-Fi", vote_average: 8.6, poster_path: "/gEU2QlsUUHXjNpeVD812C4zApKB.jpg" },
  { id: 104, title: "The Hangover", genre: "Comedy", vote_average: 7.7, poster_path: "/fjqsueOqxGQfuht2KqL2AhnjXEI.jpg" },
  { id: 105, title: "Pulp Fiction", genre: "Crime", vote_average: 8.9, poster_path: "/d5iIlFn5s0ImszYzBPbOYKQmG_u.jpg" }
];

export const fetchMoviesMockAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatabase);
    }, 1000);
  });
};
