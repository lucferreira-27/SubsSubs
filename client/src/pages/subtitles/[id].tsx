import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getSubtitleById } from '../../services/api';
import Layout from '../../components/layout/Layout';
import { FaSearch, FaSortAmountDown, FaSortAmountUp, FaInfoCircle } from 'react-icons/fa';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import DialogItem from '../../components/subtitles/DialogItem';
import TimeRangeDrawer from '../../components/subtitles/TimeRangeDrawer';
import SubtitleHeader from '../../components/subtitles/SubtitleHeader';
import { Switch } from '@headlessui/react';

interface Dialog {
  _id: string;
  startTime: string;
  endTime: string;
  text: string;
}

interface Subtitle {
  _id: string;
  showName: string;
  season: number;
  episode: number;
  language: string;
  filename: string;
  filler: boolean;
  dialogs: Dialog[];
  totalEpisodes: number;
  synopsis?: string;
  airDate?: string;
  director?: string;
  mainCast?: string[];
  rating?: number;
}

const SubtitleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subtitle, setSubtitle] = useState<Subtitle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState([0, 100]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeShortcuts, setActiveShortcuts] = useState({ skipOpening: false, skipEnding: false });
  const [exactMatch, setExactMatch] = useState(false);

  const timeToSeconds = useCallback((time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const fetchSubtitle = async () => {
      try {
        const data = await getSubtitleById(id!);
        setSubtitle({
          ...data,
          totalEpisodes: 12,
        });
      } catch (err) {
        setError('Failed to fetch subtitle details');
      } finally {
        setLoading(false);
      }
    };

    fetchSubtitle();
  }, [id]);

  const maxTime = useMemo(() => {
    if (!subtitle) return 100;
    const times = subtitle.dialogs.map(d => timeToSeconds(d.endTime));
    return Math.max(...times);
  }, [subtitle]);

  const filteredAndSortedDialogs = useMemo(() => {
    if (!subtitle) return [];
    return subtitle.dialogs
      .filter(dialog => {
        const hasText = dialog.text.trim().length > 0;
        const matchesSearch = exactMatch
          ? dialog.text.toLowerCase().split(/\s+/).includes(searchTerm.toLowerCase())
          : dialog.text.toLowerCase().includes(searchTerm.toLowerCase());
        const dialogStartTime = timeToSeconds(dialog.startTime);
        const dialogEndTime = timeToSeconds(dialog.endTime);
        const matchesTimeRange = dialogStartTime >= timeRange[0] && dialogEndTime <= timeRange[1];
        return hasText && matchesSearch && matchesTimeRange;
      })
      .sort((a, b) => {
        const comparison = timeToSeconds(a.startTime) - timeToSeconds(b.startTime);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [subtitle, searchTerm, timeRange, sortOrder, timeToSeconds, exactMatch]);

  useEffect(() => {
    if (maxTime) {
      setTimeRange([0, maxTime]);
    }
  }, [maxTime]);

  const totalDialogs = subtitle?.dialogs.length || 0;
  const shownDialogs = filteredAndSortedDialogs.length;

  const handleTimeRangeChange = (values: number[]) => {
    setTimeRange(values);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShortcutToggle = (type: 'skipOpening' | 'skipEnding') => {
    setActiveShortcuts(prev => {
      const newShortcuts = { ...prev, [type]: !prev[type] };
      let newTimeRange = [...timeRange];

      if (type === 'skipOpening') {
        if (newShortcuts.skipOpening) {
          newTimeRange[0] = Math.max(newTimeRange[0], 90);
        } else {
          newTimeRange[0] = 0;
        }
      }

      if (type === 'skipEnding') {
        if (newShortcuts.skipEnding) {
          newTimeRange[1] = Math.min(newTimeRange[1], Math.max(0, maxTime - 90));
        } else {
          newTimeRange[1] = maxTime;
        }
      }

      setTimeRange(newTimeRange);
      return newShortcuts;
    });
  };

  const handleReset = () => {
    setTimeRange([0, maxTime]);
    setActiveShortcuts({ skipOpening: false, skipEnding: false });
  };

  const placeholderDialogs: Dialog[] = [
    { _id: '1', startTime: '00:00:10', endTime: '00:00:15', text: 'Hello, this is a placeholder dialog.' },
    { _id: '2', startTime: '00:00:20', endTime: '00:00:25', text: 'It gives you an idea of how the page looks with content.' },
    { _id: '3', startTime: '00:00:30', endTime: '00:00:35', text: 'You can search and sort these placeholder items too!' },
  ];

  const dialogsToDisplay = subtitle?.dialogs.length ? filteredAndSortedDialogs : placeholderDialogs;

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="flex justify-center items-center h-screen text-accent">{error}</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-accent/10 to-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <SubtitleHeader subtitle={subtitle} />

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Metadata section */}
            <section className="lg:w-1/3 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-semibold text-light mb-6">Metadata</h2>
              <div className="space-y-4">
                <p className="text-light"><span className="font-semibold">Filename:</span> {subtitle?.filename || 'placeholder_filename.srt'}</p>
                <p className="text-light"><span className="font-semibold">Language:</span> {subtitle?.language || 'English'}</p>
                <p className="text-light"><span className="font-semibold">Type:</span> {subtitle?.filler ? 'Filler' : 'Canon'}</p>
              </div>
            </section>

            {/* Dialogs section */}
            <section className="lg:w-2/3 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-semibold text-light mb-6">Dialogs</h2>
              <div className="mb-6 space-y-4">
                {/* Dialog count and search results */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <p className="text-light text-sm">
                    Showing <span className="font-semibold text-accent">{shownDialogs}</span> of <span className="font-semibold text-accent">{totalDialogs}</span> dialogs
                  </p>
                  {searchTerm && (
                    <div className="flex items-center space-x-2">
                      <p className="text-light text-sm">
                        Results for: <span className="font-semibold text-accent">"{searchTerm}"</span>
                      </p>
                      <div className="flex items-center space-x-1">
                        <Switch
                          checked={exactMatch}
                          onChange={setExactMatch}
                          className={`${
                            exactMatch ? 'bg-accent' : 'bg-gray-600'
                          } relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none`}
                        >
                          <span className="sr-only">Exact match</span>
                          <span
                            className={`${
                              exactMatch ? 'translate-x-4' : 'translate-x-1'
                            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                          />
                        </Switch>
                        <div className="relative group">
                          <FaInfoCircle 
                            className="text-light text-xs cursor-help transition-colors duration-200 hover:text-accent" 
                          />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            Toggle exact word match for search
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search and sort controls */}
                <div className="flex gap-4">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Search dialogs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700 text-light rounded-xl focus:outline-none focus:ring-2 focus:ring-accent border border-gray-600"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <button
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 bg-gray-700 text-light rounded-xl hover:bg-gray-600 transition-colors duration-300"
                    title={sortOrder === 'asc' ? "Sort Descending" : "Sort Ascending"}
                  >
                    {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                  </button>
                </div>

                {/* Time Range Drawer */}
                <TimeRangeDrawer
                  timeRange={timeRange}
                  maxTime={maxTime}
                  onTimeRangeChange={handleTimeRangeChange}
                  formatTime={formatTime}
                  onShortcutToggle={handleShortcutToggle}
                  onReset={handleReset}
                  activeShortcuts={activeShortcuts}
                />

                {/* No results message */}
                {shownDialogs === 0 && (
                  <p className="text-accent text-sm">No dialogs found matching your criteria.</p>
                )}
              </div>

              {/* Dialog list */}
              <div className="space-y-6 max-h-[calc(100vh-32rem)] overflow-y-auto pr-4 custom-scrollbar">
                {dialogsToDisplay.length > 0 ? (
                  dialogsToDisplay.map((dialog, index) => (
                    <DialogItem
                      key={dialog._id}
                      dialog={dialog}
                      index={index}
                      searchTerm={searchTerm}
                      onCopy={copyToClipboard}
                      copiedId={copiedId}
                    />
                  ))
                ) : (
                  <p className="text-accent text-sm">No dialogs found. This could be due to filtering or lack of subtitle data.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubtitleDetailPage;