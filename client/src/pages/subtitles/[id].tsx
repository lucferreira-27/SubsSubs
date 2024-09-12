import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSubtitleById } from '../../services/api';
import Layout from '../../components/layout/Layout';

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
}

const SubtitleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [subtitle, setSubtitle] = useState<Subtitle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubtitle = async () => {
      try {
        const data = await getSubtitleById(id!);
        setSubtitle(data);
      } catch (err) {
        setError('Failed to fetch subtitle details');
      } finally {
        setLoading(false);
      }
    };

    fetchSubtitle();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-light">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-accent">{error}</div>;
  if (!subtitle) return <div className="flex justify-center items-center h-screen text-light">Subtitle not found</div>;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-light">{subtitle.showName}</h1>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
            <p className="text-light mb-2">Season: {subtitle.season}</p>
            <p className="text-light mb-2">Episode: {subtitle.episode}</p>
            <p className="text-light mb-2">Language: {subtitle.language}</p>
            <p className="text-light mb-2">Filename: {subtitle.filename}</p>
            <p className="text-light">
              Type: <span className={subtitle.filler ? 'text-yellow-400' : 'text-green-400'}>
                {subtitle.filler ? 'Filler' : 'Canon'}
              </span>
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-light">Dialogs</h2>
          <div className="space-y-4">
            {subtitle.dialogs.map((dialog) => (
              <div key={dialog._id} className="bg-white bg-opacity-10 rounded-lg p-4">
                <p className="text-accent mb-2">{dialog.startTime} - {dialog.endTime}</p>
                <p className="text-light">{dialog.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubtitleDetailPage;