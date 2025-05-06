
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { addMovie } from '@/services/movieService';
import instance from '@/api/instance';

const currentYear = new Date().getFullYear();

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  genre: z.string().min(1, 'Genre is required'),
  year: z.coerce.number()
    .int()
    .min(1895, 'Year must be after 1895 (first movie ever)')
    .max(currentYear + 5, `Year must be before ${currentYear + 5}`),
  runtime: z.coerce.number()
    .int()
    .min(1, 'Runtime must be at least 1 minute')
    .max(1000, 'Runtime must be less than 1000 minutes'),
  banner: z.string().url('Must be a valid URL').min(1, 'Banner URL is required'),
  synopsis: z.string().min(10, 'Synopsis must be at least 10 characters'),
  rating: z.coerce.number()
    .min(0, 'Rating must be between 0 and 10')
    .max(10, 'Rating must be between 0 and 10')
    .step(0.1, 'Rating can have up to 1 decimal place')
});

type FormValues = z.infer<typeof formSchema>;

const MovieForm = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      genre: '',
      year: currentYear,
      runtime: 90,
      banner: '',
      synopsis: '',
      rating: 5.0
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await instance.post("/", {
        titulo: data.title,
        genero: data.genre,
        ano: data.year,
        minutos: data.runtime,
        banner: data.banner,
        sinopse: data.synopsis,
        nota: data.rating
      })

      toast.success('Movie added successfully!');
    } catch (error) {
      toast.error('Failed to add movie');
      console.error(error);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Movie</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter movie title" 
                        {...field} 
                        className="bg-secondary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Action, Comedy, Drama, etc." 
                        {...field} 
                        className="bg-secondary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Year</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        className="bg-secondary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="runtime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Runtime (minutes)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        className="bg-secondary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Banner URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                        className="bg-secondary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="synopsis"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Synopsis</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the movie..." 
                        className="min-h-[100px] bg-secondary/50" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (0-10)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        {...field}
                        className="bg-secondary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-end gap-2 px-0 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" className="bg-cinema-500 hover:bg-cinema-600">
                Save Movie
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MovieForm;
