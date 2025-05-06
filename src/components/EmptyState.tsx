
import React from 'react';
import { Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({ message = "No movies found" }: EmptyStateProps) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 border border-dashed border-border rounded-lg">
      <Film className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">{message}</h3>
      <p className="text-muted-foreground text-center mb-6">
        Start building your movie collection today!
      </p>
      <Link to="/add-movie">
        <Button className="bg-cinema-500 hover:bg-cinema-600">Add Your First Movie</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
