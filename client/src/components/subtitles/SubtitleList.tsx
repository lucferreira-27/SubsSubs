import React, { useState, useEffect } from 'react';
import { getSubtitles } from '../../services/api';
import { Subtitle, FilterOptions } from '../../utils/types';
import FilterBar from './FilterBar';
import ActiveFilters from './ActiveFilters';
import SubtitleCard from './SubtitleCard';
import LoadingSpinner from '../common/LoadingSpinner';

const SubtitleList: React.FC = () => {
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    fetchSubtitles();
  }, [filters]);

  const fetchSubtitles = async () => {
    setLoading(true);
    try {
      const [data] = await Promise.all([
        getSubtitles(1, 10, filters),
        new Promise(resolve => setTimeout(resolve, 250))
      ]);
      setSubtitles(data.results);
    } catch (err) {
      setError('Failed to fetch subtitles');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string | number | boolean | null) => {
    if (value === null || value === '' || value === "all") {
      removeFilter(key);
    } else {
      setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    }
  };

  const removeFilter = (key: keyof FilterOptions) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };

  if (error) return <div className="flex justify-center items-center h-screen text-accent">{error}</div>;

  return (
    <div className="bg-gradient-main from-gray-900 via-accent/5 to-gray-800 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-light">Subtitle Library</h2>
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-3xl p-6 mb-8 shadow-2xl relative overflow-visible z-20">
          <div className="relative">
            <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            <ActiveFilters filters={filters} onRemoveFilter={removeFilter} />
          </div>
        </div>
        {loading ? (
          <div className="h-64 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {subtitles.length > 0 ? (
              subtitles.map((subtitle, index) => (
                <div
                  key={subtitle._id}
                  className="opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SubtitleCard subtitle={subtitle} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-light opacity-75 text-xl">
                No subtitles found. Try adjusting your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubtitleList;