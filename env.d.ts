/// <reference types="vite/client" />

interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  home: PokemonSprites;
  height: number;
  weight: number;
  stats: PokemonStat[];
}

interface PokemonStat {
  stat: NamedApiResource;
  effort: number;
  base_stat: number;
}

interface PokemonType {
  slot: number;
  type: NamedApiResource;
}

interface Type {
  id: number;
  name: string;
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    home: {
      front_default: string;
      front_shiny: string;
    };
  };
}

interface PokemonSpecie {
  evolution_chain: { url: string };
}

interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

interface ChainLink {
  species: NamedApiResource;
  evolves_to: ChainLink[];
}

interface NamedApiResource {
  name: string;
  url: string;
}
