
import React, { useEffect, useState } from 'react';
import { getAllMovies } from '@/services/movieService';
import MovieList from '@/components/MovieList';
import EmptyState from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import instance from '@/api/instance';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  
  useEffect(() => {
    async function getFilmes(){
      try {
        const response = await instance.get("/")

        setAllMovies(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    getFilmes()
  }, []);

  const filteredMovies = allMovies.filter(movie => 
    movie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
    movie.genero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container max-w-7xl py-6 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">My Movies</h1>
        
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search movies..."
            className="pl-10 bg-secondary/40"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        <EmptyState message={searchTerm ? "No movies match your search" : "Your movie collection is empty"} />
      )}
    </div>
  );
};

export default HomePage;
