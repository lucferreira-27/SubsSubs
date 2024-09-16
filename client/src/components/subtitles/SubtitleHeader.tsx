import React from 'react';
import { FaStar, FaCalendarAlt, FaUserTie, FaLanguage, FaClosedCaptioning, FaPlayCircle } from 'react-icons/fa';

interface SubtitleHeaderProps {
  subtitle: {
    showName: string;
    season: number;
    episode: number;
    language: string;
    filler: boolean;
    totalEpisodes: number;
    synopsis?: string;
    airDate?: string;
    director?: string;
    rating?: number;
  } | null;
}

const SubtitleHeader: React.FC<SubtitleHeaderProps> = ({ subtitle }) => {
  const placeholderData = {
    showName: 'Awesome TV Show',
    season: 1,
    episode: 1,
    language: 'English',
    filler: false,
    totalEpisodes: 12,
    synopsis: 'In this thrilling episode, our heroes face their greatest challenge yet as they uncover a sinister plot that threatens the entire city.',
    airDate: 'April 1, 2023',
    director: 'Jane Doe',
    rating: 8.5,
  };

  const data =  placeholderData;

  const InfoLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div className="flex items-center space-x-2 text-sm">
      <span className="text-accent">{icon}</span>
      <span className="text-light">{text}</span>
    </div>
  );

  return (
    <header className=" mb-8 overflow-hidden animate-fade-in-up">
      <div className="p-6 backdrop-filter backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
            <img
              src="https://via.placeholder.com/400x225/ffffff?text=Episode+Thumbnail"
              alt={`${data.showName} - Season ${data.season} Episode ${data.episode}`}
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-102"
            />
          </div>
          <div className="md:w-2/3 lg:w-3/4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-light mb-2 leading-tight">{data.showName}</h1>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-accent-light font-semibold text-lg">
                  S{data.season} E{data.episode}
                </span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${data.filler ? 'bg-yellow-400 text-yellow-900' : 'bg-green-400 text-green-900'}`}>
                  {data.filler ? 'Filler' : 'Canon'}
                </span>
                <InfoLabel icon={<FaPlayCircle />} text={`${data.totalEpisodes} episodes`} />
                <InfoLabel 
                  icon={<FaStar className="text-accent" />} 
                  text={data.rating ? `${data.rating.toFixed(1)}/10` : 'Not rated'}
                />
                <InfoLabel icon={<FaLanguage />} text={data.language} />
                <InfoLabel 
                  icon={<FaCalendarAlt />} 
                text={data.airDate || 'Not available'}
              />
              <InfoLabel 
                icon={<FaClosedCaptioning />} 
                text="Subtitles Available"
              />
              <div className="mt-4">
              <p className="text-sm text-light text-opacity-90">
                {data.synopsis || 'No synopsis available'}
              </p>
            </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default SubtitleHeader;