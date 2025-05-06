
import { Movie } from "../types/movie";

// Mock data
const mockMovies: Movie[] = [
  {
    id: "1",
    title: "The Matrix",
    genre: "Sci-Fi",
    year: 1999,
    runtime: 136,
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    synopsis: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7
  },
  {
    id: "2",
    title: "Inception",
    genre: "Action",
    year: 2010,
    runtime: 148,
    banner: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8
  },
  {
    id: "3",
    title: "Interstellar",
    genre: "Adventure",
    year: 2014,
    runtime: 169,
    banner: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6
  },
  {
    id: "4",
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    runtime: 142,
    banner: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3
  }
];

// In-memory movie store
let movies: Movie[] = [...mockMovies];

// Get all movies
export const getAllMovies = (): Movie[] => {
  return movies;
};

// Get a movie by ID
export const getMovieById = (id: string): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

// Add a new movie
export const addMovie = (movie: Omit<Movie, "id">): Movie => {
  const newMovie = {
    ...movie,
    id: Math.random().toString(36).substring(2, 9)
  };
  
  movies.push(newMovie);
  return newMovie;
};

// Delete a movie
export const deleteMovie = (id: string): boolean => {
  const initialLength = movies.length;
  movies = movies.filter(movie => movie.id !== id);
  return movies.length !== initialLength;
};

// Update a movie
export const updateMovie = (id: string, updatedMovie: Partial<Movie>): Movie | undefined => {
  const index = movies.findIndex(movie => movie.id === id);
  
  if (index !== -1) {
    movies[index] = { ...movies[index], ...updatedMovie };
    return movies[index];
  }
  
  return undefined;
};
