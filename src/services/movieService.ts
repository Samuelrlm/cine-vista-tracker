
import { Movie } from "../types/movie";

// Mock data
const mockMovies: Movie[] = [
  {
    id: "1",
    titulo: "The Matrix",
    genero: "Sci-Fi",
    ano: 1999,
    minutos: 136,
    banner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    sinopse: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    nota: 8.7
  },
  {
    id: "2",
    titulo: "Inception",
    genero: "Action",
    ano: 2010,
    minutos: 148,
    banner: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    sinopse: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    nota: 8.8
  },
  {
    id: "3",
    titulo: "Interstellar",
    genero: "Adventure",
    ano: 2014,
    minutos: 169,
    banner: "https://images.unsplash.com/photo-1518877593221-1f28583780b4",
    sinopse: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    nota: 8.6
  },
  {
    id: "4",
    titulo: "The Shawshank Redemption",
    genero: "Drama",
    ano: 1994,
    minutos: 142,
    banner: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac",
    sinopse: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    nota: 9.3
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
  const newMovie: Movie = {
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
