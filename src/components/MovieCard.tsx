
import React from 'react';
import { Movie } from '@/types/movie';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="overflow-hidden bg-card border-0 transition-all duration-300 hover:shadow-lg hover:shadow-cinema-500/20 group">
      <div className="aspect-[2/3] w-full relative overflow-hidden">
        <img 
          src={movie.banner} 
          alt={movie.titulo} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{movie?.nota?.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg line-clamp-1">{movie.titulo}</h3>
        <div className="flex items-center justify-between mt-1 text-sm text-muted-foreground">
          <span>{movie.ano}</span>
          <span>{movie.minutos} min</span>
        </div>
        <div className="mt-2">
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-cinema-500/20 text-cinema-300">
            {movie.genero}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
