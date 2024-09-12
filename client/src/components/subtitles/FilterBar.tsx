import React from 'react';
import { FaSearch, FaChevronDown, FaCalendarAlt, FaLanguage, FaFilm } from 'react-icons/fa';
import { FilterOptions } from '../../utils/types';

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
    <div className="flex flex-wrap items-center gap-4 p-4">
      <div className="relative flex-grow max-w-md">
        <input
          type="text"
          placeholder="Search show name..."
          value={filters.showName || ''}
          onChange={(e) => onFilterChange('showName', e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-gray-900 border border-transparent hover:border-gray-600 focus:border-accent transition-all"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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

const FilterSelect: React.FC<FilterSelectProps> = ({ icon, value, onChange, options }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-10 pr-8 py-2 rounded-lg bg-gray-800 text-light focus:outline-none focus:ring-2 focus:ring-accent focus:bg-gray-900 border border-transparent hover:border-gray-600 focus:border-accent transition-all"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default FilterBar;