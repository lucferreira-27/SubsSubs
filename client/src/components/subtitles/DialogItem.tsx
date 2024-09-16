import React, { useState, useMemo } from 'react';
import { FaCopy } from 'react-icons/fa';

interface DialogItemProps {
  dialog: {
    _id: string;
    startTime: string;
    endTime: string;
    text: string;
  };
  index: number;
  searchTerm: string;
  exactMatch: boolean;  // Add this line
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}

export const stripFormattingCharacters = (text: string): string => {
  return text.replace(/\{[^}]+\}|\\\N|\\N/g, '');
};

const DialogItem: React.FC<DialogItemProps> = ({ dialog, index, searchTerm, exactMatch, onCopy, copiedId }) => {
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);

  const parseSubtitleText = (text: string) => {
    const parts = text.split(/(\{[^}]+\}|\\\N|\\N)/);
    return parts.map((part, index) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const tag = part.slice(1, -1).toLowerCase();
        switch (tag) {
          case 'i1':
            setIsItalic(true);
            return null;
          case 'i0':
            setIsItalic(false);
            return null;
          case 'b1':
            setIsBold(true);
            return null;
          case 'b0':
            setIsBold(false);
            return null;
          default:
            return null;
        }
      } else if (part === '\\N' || part === '\N') {
        return <br key={index} />;
      } else {
        return (
          <span
            key={index}
            style={{
              fontStyle: isItalic ? 'italic' : 'normal',
              fontWeight: isBold ? 'bold' : 'normal',
            }}
          >
            {highlightSearchTerm(part, searchTerm)}
          </span>
        );
      }
    });
  };

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const words = text.split(/(\s+)/);
    return words.map((word, index) => {
      const cleanWord = word.replace(/[,.:;!?"'()[\]{}]+/g, '');
      const cleanSearchTerm = exactMatch ? searchTerm : searchTerm.toLowerCase();
      
      if (exactMatch ? cleanWord === cleanSearchTerm : cleanWord.toLowerCase().includes(cleanSearchTerm)) {
        return (
          <span
            key={index}
            className="bg-yellow-300 text-gray-800"
            style={{
              fontStyle: isItalic ? 'italic' : 'normal',
              fontWeight: isBold ? 'bold' : 'normal',
            }}
          >
            {word}
          </span>
        );
      }
      return word;
    });
  };

  const formattedText = useMemo(() => parseSubtitleText(dialog.text), [dialog.text, searchTerm]);

  return (
    <div className="relative bg-gray-700 bg-opacity-50 rounded-lg p-6 hover:bg-opacity-70 transition-all duration-300 group animate-fade-in">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-l-lg"></div>
      <div className="flex justify-between items-start mb-2">
        <p className="text-accent text-sm">{dialog.startTime} - {dialog.endTime}</p>
        <button
          onClick={() => onCopy(dialog.text, dialog._id)}
          className="text-gray-400 hover:text-accent transition-colors duration-300"
          title="Copy to clipboard"
        >
          {copiedId === dialog._id ? 'Copied!' : <FaCopy />}
        </button>
      </div>
      <p className="text-light text-lg">{formattedText}</p>
      <div className="absolute left-4 -top-3 bg-accent text-primary text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {dialog.startTime}
      </div>
    </div>
  );
};

export default DialogItem;