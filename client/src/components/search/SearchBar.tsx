import React, { useState } from 'react';
import { searchSubtitles } from '../../services/api';

interface SearchResult {
  _id: string;
  episode: number;
  filename: string;
  dialogs: Array<{
    _id: string;
    text: string;
    startTime: string;
    endTime: string;
  }>;
  matchCount: number;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await searchSubtitles(searchTerm);
      setSearchResults(data.results);
    } catch (err) {
      setError('Failed to perform search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for subtitles..."
            className="flex-grow px-4 py-2 border border-secondary rounded-l focus:outline-none focus:ring-2 focus:ring-accent text-primary"
          />
          <button
            type="submit"
            className="bg-accent text-light px-6 py-2 rounded-r hover:bg-secondary transition duration-300"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <p className="text-accent mb-4">{error}</p>}

      {searchResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <ul className="space-y-4">
            {searchResults.map((result) => (
              <li key={result._id} className="bg-secondary text-light p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Episode: {result.episode}</h3>
                <p className="mb-2">Filename: {result.filename}</p>
                <p className="mb-2">Matches: {result.matchCount}</p>
                <ul className="list-disc list-inside">
                  {result.dialogs.map((dialog) => (
                    <li key={dialog._id} className="mb-2">
                      <p className="text-xs text-accent">{dialog.startTime} - {dialog.endTime}</p>
                      <p>{dialog.text}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;