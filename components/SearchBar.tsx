
import React from 'react';
import { POKEMON_TYPES } from '../constants';
import { SortOption } from '../types';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-[60px] z-20 py-4 px-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-poke-red dark:bg-gray-700 dark:text-white"
          />
          <svg className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 capitalize border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-poke-red dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Types</option>
            {POKEMON_TYPES.map(type => (
              <option key={type} value={type} className="capitalize">{type}</option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-poke-red dark:bg-gray-700 dark:text-white"
          >
            <option value={SortOption.ID}>Sort by Number</option>
            <option value={SortOption.NAME}>Sort by Name</option>
            <option value={SortOption.TOTAL_STATS}>Sort by Stat Total</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
