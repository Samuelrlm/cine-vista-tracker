import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '@/types/movie';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Star, Calendar, Clock } from 'lucide-react';
import instance from '@/api/instance';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const response = await instance.get(`/${id}`);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Não foi possível carregar os detalhes do filme.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="container max-w-7xl py-12 px-4">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-cinema-300">Carregando detalhes do filme...</div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container max-w-7xl py-12 px-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="text-destructive">{error || 'Filme não encontrado'}</p>
          <Link to="/">
            <Button variant="outline">Voltar para a lista de filmes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl py-12 px-4">
      <Link to="/" className="flex items-center gap-2 text-cinema-300 hover:text-cinema-500 mb-8">
        <Button variant="ghost" size="sm" className="gap-1">
          Voltar para a lista
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
          <img 
            src={movie.banner} 
            alt={movie.titulo} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Movie Details */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.titulo}</h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{movie.ano}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{movie.minutos} min</span>
              </div>
              <HoverCard>
                <HoverCardTrigger>
                  <div className="flex items-center gap-1 cursor-help">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{movie.nota?.toFixed(1)}</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm">
                  Classificação do filme: {movie.nota?.toFixed(1)}/10
                </HoverCardContent>
              </HoverCard>
              <span className="inline-block px-3 py-1 rounded-full bg-cinema-500/20 text-cinema-300 text-sm">
                {movie.genero}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Sinopse</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.sinopse}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
