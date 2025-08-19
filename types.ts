
export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprite: string;
  height: number;
  weight: number;
  abilities: Ability[];
  stats: Stat[];
  evolutionChain: Evolution[];
  totalStats: number;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface Ability {
  name: string;
  url: string;
  description: string;
  isHidden: boolean;
}

export interface Stat {
  name: string;
  base_stat: number;
}

export interface Evolution {
  name: string;
  sprite: string;
  id: number;
}

export enum SortOption {
    ID = 'id',
    NAME = 'name',
    TOTAL_STATS = 'total_stats',
}
