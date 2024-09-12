import React, { useState, useRef } from 'react';
import { FaSearch, FaChevronDown, FaCalendarAlt, FaLanguage, FaFilm } from 'react-icons/fa';
import { FilterOptions } from '../../utils/types';
import useClickOutside from '../../hooks/useClickOutside';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string | number | boolean | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  const seasons = [1, 2, 3, 4, 5];
  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-6 p-6 relative z-30">
      <div className="relative flex-grow max-w-md group">
        <input
          type="text"
          placeholder="Search show name..."
          value={filters.showName || ''}
          onChange={(e) => onFilterChange('showName', e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-800 text-light rounded-xl focus:outline-none focus:ring-2 focus:ring-accent border border-gray-700 group-hover:border-gray-600 transition-all duration-300"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors duration-300" />
      </div>
      <FilterSelect
        icon={<FaCalendarAlt />}
        value={filters.season?.toString() || 'all'}
        onChange={(value) => onFilterChange('season', value === 'all' ? null : parseInt(value))}
        options={[{ value: 'all', label: 'All Seasons' }, ...seasons.map(num => ({ value: num.toString(), label: `Season ${num}` }))]}
        placeholder="Select Season"
      />
      <FilterSelect
        icon={<FaLanguage />}
        value={filters.language || 'all'}
        onChange={(value) => onFilterChange('language', value === 'all' ? null : value)}
        options={[{ value: 'all', label: 'All Languages' }, ...languages]}
        placeholder="Select Language"
      />
      <FilterSelect
        icon={<FaFilm />}
        value={filters.filler !== undefined && filters.filler !== null ? filters.filler.toString() : 'all'}
        onChange={(value) => onFilterChange('filler', value === 'all' ? null : value === 'true')}
        options={[
          { value: 'all', label: 'All Episodes' },
          { value: 'true', label: 'Filler Episodes' },
          { value: 'false', label: 'Canon Episodes' },
        ]}
        placeholder="Episode Type"
      />
    </div>
  );
};

interface FilterSelectProps {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ icon, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => setIsOpen(false));

  return (
    <div ref={selectRef} className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full pl-12 pr-4 py-3 bg-gray-800 text-light rounded-xl focus:outline-none focus:ring-2 focus:ring-accent border border-gray-700 group-hover:border-gray-600 transition-all duration-300"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex-grow text-left truncate mr-4">
          {options.find(opt => opt.value === value)?.label || placeholder}
        </span>
        <span className="flex-shrink-0 w-6 flex justify-center">
          <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </span>
      </button>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors duration-300">
        {icon}
      </div>
      <div 
        className={`absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
        role="listbox"
      >
        {options.map(({ value: optionValue, label }) => (
          <button
            key={optionValue}
            onClick={() => {
              onChange(optionValue);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-light hover:bg-gray-700 transition-colors duration-150"
            role="option"
            aria-selected={value === optionValue}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;