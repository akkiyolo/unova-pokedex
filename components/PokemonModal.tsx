
import React, { useEffect } from 'react';
import { Pokemon, Stat } from '../types';
import { TYPE_COLORS } from '../constants';
import { CloseIcon, WeightIcon, HeightIcon } from './Icons';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  onClose: () => void;
}

const StatBar: React.FC<{ stat: Stat }> = ({ stat }) => {
  const percentage = (stat.base_stat / 255) * 100;
  const color =
    percentage < 33 ? 'bg-red-500' :
    percentage < 66 ? 'bg-yellow-500' :
    'bg-green-500';

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="w-1/4 text-sm font-semibold capitalize text-gray-600 dark:text-gray-400 text-right">{stat.name}</span>
      <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
        <div
          className={`h-4 rounded-full ${color} flex items-center justify-end pr-2 transition-width duration-500`}
          style={{ width: `${percentage}%` }}
        >
          <span className="text-xs font-bold text-white">{stat.base_stat}</span>
        </div>
      </div>
    </div>
  );
};

const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!pokemon) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            aria-label="Close"
          >
            <CloseIcon className="w-8 h-8" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="flex flex-col items-center">
              <img src={pokemon.sprite} alt={pokemon.name} className="w-64 h-64 object-contain mb-4" />
              <p className="text-lg text-gray-500 dark:text-gray-400">#{String(pokemon.id).padStart(3, '0')}</p>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white capitalize mb-2">{pokemon.name}</h2>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span key={type.name} className={`px-4 py-1.5 text-sm font-semibold rounded-full capitalize ${TYPE_COLORS[type.name]}`}>
                    {type.name}
                  </span>
                ))}
              </div>
              <div className="flex justify-around w-full mt-6 text-center">
                  <div className="flex items-center gap-2">
                    <WeightIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>
                    <div>
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{pokemon.weight} kg</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeightIcon className="w-6 h-6 text-gray-500 dark:text-gray-400"/>
                     <div>
                        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{pokemon.height} m</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Height</p>
                    </div>
                  </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-1">Base Stats</h3>
                <div className="flex flex-col gap-2">
                  {pokemon.stats.map(stat => <StatBar key={stat.name} stat={stat} />)}
                  <div className="flex items-center gap-2 w-full mt-2">
                    <span className="w-1/4 text-sm font-bold capitalize text-gray-700 dark:text-gray-300 text-right">Total</span>
                     <div className="w-3/4 flex items-center justify-end pr-2">
                       <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{pokemon.totalStats}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-1">Abilities</h3>
                <ul className="space-y-2">
                  {pokemon.abilities.map(ability => (
                    <li key={ability.name}>
                      <p className="font-semibold capitalize text-gray-700 dark:text-gray-300">
                        {ability.name} {ability.isHidden && <span className="text-xs text-gray-500">(Hidden)</span>}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ability.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-1">Evolution Chain</h3>
                <div className="flex justify-around items-center gap-2">
                    {pokemon.evolutionChain.map((evo, index) => (
                        <React.Fragment key={evo.id}>
                            <div className={`text-center flex flex-col items-center p-2 rounded-lg transition-transform duration-300 ${evo.id === pokemon.id ? 'bg-gray-200 dark:bg-gray-700 scale-110' : ''}`}>
                                <img src={evo.sprite} alt={evo.name} className="w-20 h-20" />
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{evo.name}</p>
                            </div>
                            {index < pokemon.evolutionChain.length - 1 && (
                                <span className="text-2xl text-gray-400 dark:text-gray-500 font-thin">&rarr;</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
