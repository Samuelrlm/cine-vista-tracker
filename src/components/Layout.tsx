
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 border-t border-border/40 mt-auto">
        <div className="container text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CineVista - Your Personal Movie Tracker
        </div>
      </footer>
    </div>
  );
};

export default Layout;
