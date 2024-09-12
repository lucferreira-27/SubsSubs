import React, { useState } from 'react';
import { searchSubtitles } from '../services/api';
import Layout from '../components/layout/Layout';

interface SearchResult {
  _id: string;
  showName: string;
  season: number;
  episode: number;
  dialogs: Array<{ text: string; startTime: string; endTime: string }>;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchSubtitles(query);
      setResults(data.results);
    } catch (err) {
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-light">Search Dialogs</h1>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter search query..."
                className="flex-grow p-3 rounded-l-lg bg-white bg-opacity-20 text-light placeholder-light placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-primary px-6 py-3 rounded-r-lg font-semibold hover:bg-light hover:text-accent transition-colors duration-300"
              >
                Search
              </button>
            </div>
          </form>

          {loading && <div className="text-light">Loading...</div>}
          {error && <div className="text-accent">{error}</div>}

          {results.length > 0 && (
            <div className="space-y-6">
              {results.map((result) => (
                <div key={result._id} className="bg-white bg-opacity-10 rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-light mb-2">
                    {result.showName} - S{result.season} E{result.episode}
                  </h2>
                  <div className="space-y-2">
                    {result.dialogs.map((dialog, index) => (
                      <div key={index} className="text-light">
                        <span className="text-accent">{dialog.startTime} - {dialog.endTime}:</span> {dialog.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;