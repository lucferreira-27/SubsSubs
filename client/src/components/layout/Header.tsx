import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-main from-primary to-secondary text-light">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Subtitle App</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link></li>
            <li><Link to="/subtitles" className="hover:text-accent transition-colors duration-300">Subtitles</Link></li>
            <li><Link to="/search" className="hover:text-accent transition-colors duration-300">Search</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;