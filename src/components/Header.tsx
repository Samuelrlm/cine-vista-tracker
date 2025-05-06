
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b border-border/40 sticky top-0 z-10 w-full backdrop-blur-xl bg-background/80">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Film className="w-6 h-6 text-cinema-500" />
          <span className="text-xl font-bold text-white">CineVista</span>
        </Link>
        <Link to="/add-movie">
          <Button variant="outline" className="flex items-center gap-2 border-cinema-500 hover:bg-cinema-500/20">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Movie</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
