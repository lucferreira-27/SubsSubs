import React from 'react';
import { Link } from 'react-router-dom';
import { Subtitle } from '../../utils/types';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';

interface SubtitleCardProps {
  subtitle: Subtitle;
}

const SubtitleCard: React.FC<SubtitleCardProps> = ({ subtitle }) => {
  return (
    <Link to={`/subtitles/${subtitle._id}`} className="block">
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-card-appear overflow-hidden">
        <div className="p-4">
          <h3 className="text-xl font-semibold text-light truncate">{subtitle.showName || 'Untitled Show'}</h3>
        </div>
        <div className="p-4">
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
            <span className="px-2 py-1 bg-blue-400 bg-opacity-20 text-blue-400 text-xs font-semibold rounded-full flex items-center">
              <ChatBubbleOvalLeftIcon className="w-3 h-3 mr-1" />
              {subtitle.dialogCount}
            </span>
          </div>
          <p className="text-xs text-light opacity-75 truncate">{subtitle.filename || 'No filename available'}</p>
        </div>
      </div>
    </Link>
  );
};

export default SubtitleCard;