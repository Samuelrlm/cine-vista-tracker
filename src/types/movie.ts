
export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  runtime: number; // in minutes
  banner: string;
  synopsis: string;
  rating: number; // score from 0 to 10
}
