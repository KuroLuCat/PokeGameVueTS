import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame';
import { describe, expect, test, vi } from 'vitest';
import { withSetup } from '../../../utils/with-setup';
import { GameStatus } from '@/modules/pokemon/interfaces';
import { flushPromises } from '@vue/test-utils';

import MockAdapter from 'axios-mock-adapter';
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi';
import { pokemonListFake } from '../../../data/fake-pokemons';
import confetti from 'canvas-confetti';

//mock de axios
const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet('/?limit=151').reply(200, {
  //   results: Array.from({ length: 151 }, (_, i) => ({
  //     name: `pokemon-${i + 1}`,
  //     url: `https://pokeapi.co/api/v2/pokemon/${i + 1}/`,
  //   })),
  results: pokemonListFake,
});

//mock de confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('uePokemonGame', async () => {
  test('should initialize with the correct default values', async () => {
    const [results] = withSetup(usePokemonGame);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    // await new Promise((r) => setTimeout(r, 1000));
    await flushPromises();

    expect(results.isLoading.value).toBe(false);
    expect(results.pokemonOptions.value.length).toBe(4);
    expect(results.randomPokemon.value).toEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });
  });

  test('should correctly hadle getNextRound', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    results.getNextRound(5);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    // expect(results.pokemonOptions.value.length).toBe(5);
    expect(results.pokemonOptions.value).toHaveLength(5);
  });

  test('should correctly hadle getNextRound and return different pokemons', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const firstOptions = [...results.pokemonOptions.value].map((p) => p.name);

    results.getNextRound(4);
    const secondOptions = [...results.pokemonOptions.value];

    secondOptions.forEach((pokemon) => {
      expect(firstOptions).not.toContain(pokemon.name);
    });
  });

  test('should correctly hadle a incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(10000000000000);

    expect(gameStatus.value).toBe(GameStatus.Lost);
  });

  test('should correctly hadle a correct answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;

    expect(gameStatus.value).toBe(GameStatus.Playing);

    checkAnswer(randomPokemon.value.id);

    expect(confetti).toHaveBeenCalled();
    expect(confetti).toHaveBeenCalledWith({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
    });
    expect(gameStatus.value).toBe(GameStatus.Won);
  });
});
