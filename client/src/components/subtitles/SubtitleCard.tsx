import React from 'react';
import { Link } from 'react-router-dom';
import { Subtitle } from '../../utils/types';
import { ChatBubbleOvalLeftIcon, FilmIcon, LanguageIcon, ClockIcon } from '@heroicons/react/24/outline';

interface SubtitleCardProps {
  subtitle: Subtitle;
}

const SubtitleCard: React.FC<SubtitleCardProps> = ({ subtitle }) => {
  return (
    <Link to={`/subtitles/${subtitle._id}`} className="group">
      <div className="relative bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        <div className="relative z-10 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-grow mr-4">
              <h3 className="text-2xl font-bold text-light mb-2 truncate">{subtitle.showName || 'Untitled Show'}</h3>
              <p className="text-sm text-light opacity-75 break-all">{subtitle.filename || 'No filename available'}</p>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${subtitle.filler ? 'bg-yellow-400 text-yellow-900' : 'bg-green-400 text-green-900'}`}>
                {subtitle.filler ? 'Filler' : 'Canon'}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <InfoChip 
              icon={<FilmIcon className="w-4 h-4" />} 
              label={`S${subtitle.season || '?'} E${subtitle.episode || '?'}`} 
            />
            <InfoChip 
              icon={<LanguageIcon className="w-4 h-4" />} 
              label={subtitle.language?.toUpperCase() || 'N/A'} 
            />
            <InfoChip 
              icon={<ChatBubbleOvalLeftIcon className="w-4 h-4" />} 
              label={`${subtitle.dialogCount || '?'} lines`} 
            />
            <InfoChip icon={<ClockIcon className="w-4 h-4" />} label="45:00" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
};

const InfoChip: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center space-x-2 text-light opacity-75 group-hover:opacity-100 transition-opacity duration-300">
    {icon}
    <span className="text-sm font-medium whitespace-nowrap">{label}</span>
  </div>
);

export default SubtitleCard;