import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <header className="bg-secondary py-4">
        <nav className="container mx-auto px-4">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-light hover:text-accent transition-colors duration-300">Home</Link>
            </li>
            <li>
              <Link to="/subtitles" className="text-light hover:text-accent transition-colors duration-300">Subtitles</Link>
            </li>
            <li>
              <Link to="/search" className="text-light hover:text-accent transition-colors duration-300">Search</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-secondary py-4 text-center text-light">
        <p>&copy; 2024 Subtitle Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;