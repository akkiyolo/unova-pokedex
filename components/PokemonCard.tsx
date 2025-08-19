
import React from 'react';
import { Pokemon } from '../types';
import { TYPE_COLORS } from '../constants';
import { StarIcon } from './Icons';

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
  isFavorite: boolean;
  onToggleFavorite: (pokemonId: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onSelect, isFavorite, onToggleFavorite }) => {
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleFavorite(pokemon.id);
    };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl dark:hover:shadow-red-500/40 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center p-4 relative animate-fadeIn"
      onClick={() => onSelect(pokemon)}
    >
        <button onClick={handleFavoriteClick} className="absolute top-2 right-2 p-1 z-10" aria-label="Toggle Favorite">
            <StarIcon className={`w-6 h-6 transition-colors ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 dark:text-gray-500 hover:text-yellow-400'}`}/>
        </button>
      <div className="w-32 h-32 md:w-40 md:h-40 mb-4">
        <img src={pokemon.sprite} alt={pokemon.name} className="w-full h-full object-contain" loading="lazy" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500 font-semibold">#{String(pokemon.id).padStart(3, '0')}</p>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200 capitalize">{pokemon.name}</h2>
        <div className="flex justify-center gap-2 mt-2">
          {pokemon.types.map((type) => (
            <span
              key={type.name}
              className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${TYPE_COLORS[type.name]}`}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
