interface AbilitiesType {
  ability: {
    name: string;
    url: string;
  };
}

export interface DetailsType {
  id: number;
  base_experience: number;
  abilities: AbilitiesType[];
  weight: number;
  height: number;
  sprites: {
    back_default: string;
    front_default: string;
  };
}

export interface PokemonEvolutionType {
  baby_trigger_item: PokemonDataType | null;
  chain: ChainEvolutionType;
  id: number;
}

interface ChainEvolutionType {
  evolution_details: [];
  evolves_to: EevolvesToType[];
  is_baby: boolean;
  species: PokemonDataType;
}

interface EevolvesToType {
  evolution_details: EvolutionDetailsType[];
  evolves_to: [];
  is_baby: boolean;
  species: PokemonDataType;
}

interface PokemonDataType {
  name: string;
  url: string;
  imageUrl?: string;
}

interface EvolutionDetailsType {
  gender: null | string;
  held_item: null | string;
  item: null | string;
  known_move: null | string;
  known_move_type: null | string;
  location: null | string;
  min_affection: null | string;
  min_beauty: null | string;
  min_happiness: null | string;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species: null | string;
  party_type: null | string;
  relative_physical_stats: null | string;
  time_of_day: string;
  trade_species: null | string;
  trigger: PokemonDataType;
  turn_upside_down: boolean;
}
