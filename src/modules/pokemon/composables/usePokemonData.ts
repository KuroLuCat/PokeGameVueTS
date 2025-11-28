import { pokemonApi } from '../api/pokemonApi';
import type { Pokemon, PokemonListResponse } from '../interfaces';

export const usePokemonData = () => {
  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts.at(-2) ?? 0;
      return {
        name: pokemon.name,
        id: +id,
      };
    });
    return pokemonsArray.sort(() => Math.random() - 0.5);
  };

  return {
    getPokemons,
  };
};
