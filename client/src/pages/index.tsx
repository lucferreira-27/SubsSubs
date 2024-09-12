import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-secondary text-light">
        <h1 className="text-5xl font-bold mb-8">Welcome to Subtitle Manager</h1>
        <p className="text-xl mb-12 text-center max-w-2xl">
          Easily manage, search, and organize your subtitle collection with our powerful tools.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/subtitles"
            className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-light hover:text-accent transition-colors duration-300"
          >
            Browse Subtitles
          </Link>
          <Link
            to="/search"
            className="bg-white bg-opacity-20 text-light px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-colors duration-300"
          >
            Search Dialogs
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;