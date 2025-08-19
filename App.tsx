
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getUnovaPokemon } from './services/pokeApiService';
import { Pokemon, SortOption } from './types';
import Header from './components/Header';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import SearchBar from './components/SearchBar';
import { LoadingSpinner } from './components/Icons';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.ID);
  
  const [favorites, setFavorites] = useLocalStorage<number[]>('favoritePokemon', []);
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>('darkMode', false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const fetchPokemon = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const pokemonData = await getUnovaPokemon();
      setAllPokemon(pokemonData);
      setFilteredPokemon(pokemonData);
    } catch (err) {
      console.error(err);
      setError('Failed to catch \'em all. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const sortedAndFilteredPokemon = useMemo(() => {
    return [...allPokemon]
      .filter(pokemon => {
        const matchesSearch =
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(pokemon.id).includes(searchTerm);
        const matchesType = selectedType ? pokemon.types.some(t => t.name === selectedType) : true;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case SortOption.NAME:
            return a.name.localeCompare(b.name);
          case SortOption.TOTAL_STATS:
            return b.totalStats - a.totalStats;
          case SortOption.ID:
          default:
            return a.id - b.id;
        }
      });
  }, [allPokemon, searchTerm, selectedType, sortOption]);

  useEffect(() => {
    setFilteredPokemon(sortedAndFilteredPokemon);
  }, [sortedAndFilteredPokemon]);

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  const handleToggleFavorite = (pokemonId: number) => {
    setFavorites(prev => 
        prev.includes(pokemonId) 
        ? prev.filter(id => id !== pokemonId)
        : [...prev, pokemonId]
    );
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 bg-poke-light dark:bg-poke-dark text-gray-900 dark:text-gray-100`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <SearchBar 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        selectedType={selectedType} setSelectedType={setSelectedType}
        sortOption={sortOption} setSortOption={setSortOption}
      />
      <main className="container mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold h-[calc(100vh-200px)] flex items-center justify-center">
            <p>{error}</p>
          </div>
        ) : filteredPokemon.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onSelect={handleSelectPokemon}
                isFavorite={favorites.includes(pokemon.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
             <div className="text-center text-gray-500 dark:text-gray-400 h-[calc(100vh-200px)] flex flex-col items-center justify-center">
                 <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/571.png" alt="Zoroark" className="w-32 h-32 opacity-50 mb-4" />
                <p className="text-xl font-semibold">No Pokémon Matched Your Search!</p>
                <p>Try a different name, number, or type.</p>
             </div>
        )}
      </main>
      <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
