
import React from 'react';
import MovieForm from '@/components/MovieForm';

const AddMoviePage = () => {
  return (
    <div className="container max-w-7xl py-6 px-4">
      <h1 className="text-3xl font-bold mb-8">Add New Movie</h1>
      <MovieForm />
    </div>
  );
};

export default AddMoviePage;
