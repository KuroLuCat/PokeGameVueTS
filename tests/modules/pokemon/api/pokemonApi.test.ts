import { pokemonApi } from '@pokemon/api/pokemonApi';
import { describe, test, expect } from 'vitest';

describe('pokemonApi', () => {
  test('should be configured as expected', () => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon';

    expect(pokemonApi.defaults.baseURL).toBe(baseURL);
  });
});
