import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FilterOptions } from '../../utils/types';

interface ActiveFiltersProps {
  filters: FilterOptions;
  onRemoveFilter: (key: keyof FilterOptions) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemoveFilter }) => {
  const formatFilterValue = (key: string, value: any): string => {
    if (key === 'filler') {
      return value ? 'Filler' : 'Canon';
    }
    return value.toString();
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {Object.entries(filters).map(([key, value]) => (
        <div
          key={key}
          className="group bg-gradient-to-r from-accent to-accent-light text-white px-4 py-2 rounded-xl text-sm flex items-center shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in-scale"
        >
          <span className="font-medium mr-2">{key}:</span>
          <span>{formatFilterValue(key, value)}</span>
          <button 
            onClick={() => onRemoveFilter(key as keyof FilterOptions)} 
            className="ml-2 text-xs bg-white bg-opacity-0 group-hover:bg-opacity-20 rounded-full p-1 transition-all duration-300"
            aria-label={`Remove ${key} filter`}
          >
            <FaTimes className="transform group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;