
import React from 'react';
import { SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-poke-red shadow-md w-full sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="Pokéball" className="w-8 h-8"/>
          <h1 className="text-2xl font-bold text-white tracking-tight">Unova Pokédex</h1>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
