import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FilterOptions } from '../../utils/types';
interface ActiveFiltersProps {
  filters: FilterOptions;
  onRemoveFilter: (key: keyof FilterOptions) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemoveFilter }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {Object.entries(filters).map(([key, value]) => (
        <div key={key} className="bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm flex items-center">
          {`${key}: ${value}`}
          <button onClick={() => onRemoveFilter(key as keyof FilterOptions)} className="ml-2 text-xs">
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;