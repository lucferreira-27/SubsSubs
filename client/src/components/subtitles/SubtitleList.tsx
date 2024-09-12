import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubtitles } from '../../services/api';
import { FilterOptions } from '../../utils/utils';

interface Subtitle {
  _id: string;
  episode: number;
  season: number;
  showName: string;
  language: string;
  filename: string;
  filler: boolean;
}

const SubtitleList: React.FC = () => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [tempFilters, setTempFilters] = useState<FilterOptions>({});

  useEffect(() => {
    fetchSubtitles();
  }, [filters]);

  const fetchSubtitles = async () => {
    setLoading(true);
    try {
      const data = await getSubtitles(1, 10, filters);
      setSubtitles(data.results);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch subtitles');
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string | number | boolean) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-light">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-accent">{error}</div>;

  return (
    <div className="bg-gradient-to-br from-primary to-secondary min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-light">Subtitle Library</h2>
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <input
              type="text"
              placeholder="Search show name..."
              onChange={(e) => handleFilterChange('showName', e.target.value)}
              className="w-full p-2 rounded-md bg-white bg-opacity-20 text-light placeholder-light placeholder-opacity-50 border border-light border-opacity-20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <select
              onChange={(e) => handleFilterChange('season', parseInt(e.target.value))}
              className="w-full p-2 rounded-md bg-white bg-opacity-20 text-light border border-light border-opacity-20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">All Seasons</option>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>Season {num}</option>
              ))}
            </select>
            <select
              onChange={(e) => handleFilterChange('language', e.target.value)}
              className="w-full p-2 rounded-md bg-white bg-opacity-20 text-light border border-light border-opacity-20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
            <select
              onChange={(e) => handleFilterChange('filler', e.target.value === 'true')}
              className="w-full p-2 rounded-md bg-white bg-opacity-20 text-light border border-light border-opacity-20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">All Episodes</option>
              <option value="true">Filler</option>
              <option value="false">Canon</option>
            </select>
            <select
              onChange={(e) => handleFilterChange('order', e.target.value)}
              className="w-full p-2 rounded-md bg-white bg-opacity-20 text-light border border-light border-opacity-20 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <button
              onClick={applyFilters}
              className="w-full bg-accent text-primary p-2 rounded-md hover:bg-light hover:text-accent transition-colors duration-300 font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subtitles.length > 0 ? (
            subtitles.map((subtitle) => (
              <Link to={`/subtitles/${subtitle._id}`} key={subtitle._id} className="block">
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-xl font-semibold text-light mb-3">{subtitle.showName || 'Untitled Show'}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-accent bg-opacity-20 text-accent text-xs font-semibold rounded-full">
                      S{subtitle.season} E{subtitle.episode}
                    </span>
                    <span className="px-2 py-1 bg-light bg-opacity-20 text-light text-xs font-semibold rounded-full">
                      {subtitle.language ? subtitle.language.toUpperCase() : 'N/A'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${subtitle.filler ? 'bg-yellow-400 bg-opacity-20 text-yellow-400' : 'bg-green-400 bg-opacity-20 text-green-400'}`}>
                      {subtitle.filler ? 'Filler' : 'Canon'}
                    </span>
                  </div>
                  <p className="text-sm text-light opacity-75">{subtitle.filename || 'No filename available'}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-light opacity-75">
              No subtitles found. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubtitleList;