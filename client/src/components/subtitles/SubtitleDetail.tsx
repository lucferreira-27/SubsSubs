import React, { useState, useEffect } from 'react';
import { getSubtitleById } from '../../services/api';

interface SubtitleDetailProps {
  id: string | undefined;
}

interface Subtitle {
  _id: string;
  episode: number;
  season: number;
  showName: string;
  language: string;
  filename: string;
  dialogs: Array<{
    _id: string;
    text: string;
    startTime: string;
    endTime: string;
  }>;
}

const SubtitleDetail: React.FC<SubtitleDetailProps> = ({ id }) => {
  const [subtitle, setSubtitle] = useState<Subtitle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubtitleDetail = async () => {
      if (!id) return;
      try {
        const data = await getSubtitleById(id);
        setSubtitle(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch subtitle details');
        setLoading(false);
      }
    };

    fetchSubtitleDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!subtitle) return <div>Subtitle not found</div>;

  return (
    <div className="bg-secondary text-light shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-4">{subtitle.showName}</h2>
      <p className="mb-2">Season: {subtitle.season}, Episode: {subtitle.episode}</p>
      <p className="mb-4">Language: {subtitle.language}</p>
      <h3 className="text-xl font-semibold mb-2">Dialogs:</h3>
      <div className="bg-primary p-4 rounded max-h-96 overflow-y-auto">
        {subtitle.dialogs.map((dialog) => (
          <div key={dialog._id} className="mb-4">
            <p className="text-xs text-accent">{dialog.startTime} - {dialog.endTime}</p>
            <p className="whitespace-pre-wrap">{dialog.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubtitleDetail;