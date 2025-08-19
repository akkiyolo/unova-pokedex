
import { Pokemon, Ability, Stat, Evolution, PokemonType } from '../types';
import { UNOVA_MIN_ID, UNOVA_MAX_ID } from '../constants';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const fetchJson = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
  }
  return response.json();
};

const getAbilityDescription = async (abilityUrl: string): Promise<string> => {
    const abilityData = await fetchJson<{ effect_entries: { effect: string; language: { name: string } }[] }>(abilityUrl);
    const englishEntry = abilityData.effect_entries.find(entry => entry.language.name === 'en');
    return englishEntry ? englishEntry.effect : 'No description available.';
};

const processEvolutionChain = async (chainUrl: string): Promise<Evolution[]> => {
    const evolutionData = await fetchJson<{ chain: any }>(chainUrl);
    const evolutions: Evolution[] = [];
    
    let currentStage = evolutionData.chain;
    while (currentStage) {
        const speciesName = currentStage.species.name;
        const speciesId = parseInt(currentStage.species.url.split('/').slice(-2, -1)[0]);
        evolutions.push({
            name: speciesName.charAt(0).toUpperCase() + speciesName.slice(1),
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`,
            id: speciesId
        });
        currentStage = currentStage.evolves_to[0];
    }
    return evolutions;
};

const getPokemonDetails = async (id: number): Promise<Pokemon> => {
  const pokemonData = await fetchJson<any>(`${API_BASE_URL}/pokemon/${id}`);
  const speciesData = await fetchJson<any>(`${API_BASE_URL}/pokemon-species/${id}`);

  const abilities = await Promise.all(
    pokemonData.abilities.map(async (abilityInfo: any): Promise<Ability> => {
      const description = await getAbilityDescription(abilityInfo.ability.url);
      return {
        name: abilityInfo.ability.name.replace(/-/g, ' '),
        url: abilityInfo.ability.url,
        isHidden: abilityInfo.is_hidden,
        description: description,
      };
    })
  );

  const stats: Stat[] = pokemonData.stats.map((statInfo: any) => ({
    name: statInfo.stat.name.replace(/-/g, ' '),
    base_stat: statInfo.base_stat,
  }));
  
  const totalStats = stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  const evolutionChain = await processEvolutionChain(speciesData.evolution_chain.url);

  return {
    id: pokemonData.id,
    name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
    types: pokemonData.types.map((typeInfo: any): PokemonType => ({
        name: typeInfo.type.name,
        url: typeInfo.type.url
    })),
    sprite: pokemonData.sprites.other['official-artwork'].front_default,
    height: pokemonData.height / 10, // decimeters to meters
    weight: pokemonData.weight / 10, // hectograms to kilograms
    abilities,
    stats,
    evolutionChain,
    totalStats
  };
};

export const getUnovaPokemon = async (): Promise<Pokemon[]> => {
  const cacheKey = 'unova_pokemon_data';
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      // Simple validation to check if it's our data
      if (Array.isArray(parsedData) && parsedData[0]?.id === UNOVA_MIN_ID) {
        return parsedData;
      }
    } catch (e) {
      console.error("Failed to parse cached Pokémon data", e);
      localStorage.removeItem(cacheKey);
    }
  }

  const pokemonPromises: Promise<Pokemon>[] = [];
  for (let id = UNOVA_MIN_ID; id <= UNOVA_MAX_ID; id++) {
    pokemonPromises.push(getPokemonDetails(id));
  }
  const allPokemon = await Promise.all(pokemonPromises);
  
  localStorage.setItem(cacheKey, JSON.stringify(allPokemon));
  return allPokemon;
};
