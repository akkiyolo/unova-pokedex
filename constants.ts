
export const UNOVA_MIN_ID = 494;
export const UNOVA_MAX_ID = 649;

export const TYPE_COLORS: { [key: string]: string } = {
  normal: 'bg-gray-400 text-white',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-gray-800',
  grass: 'bg-green-500 text-white',
  ice: 'bg-cyan-300 text-gray-800',
  fighting: 'bg-orange-700 text-white',
  poison: 'bg-purple-600 text-white',
  ground: 'bg-yellow-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-gray-800',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-indigo-800 text-white',
  dragon: 'bg-violet-700 text-white',
  dark: 'bg-zinc-700 text-white',
  steel: 'bg-slate-400 text-gray-800',
  fairy: 'bg-pink-300 text-gray-800',
};

export const POKEMON_TYPES = Object.keys(TYPE_COLORS);
