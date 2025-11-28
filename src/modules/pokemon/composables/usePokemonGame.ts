import { computed, onMounted, ref } from 'vue';
// import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces';
import { GameStatus, type Pokemon } from '../interfaces';
// import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';
// import { usePokemonCountdown } from './usePokemonCountdown';
import { usePokemonData } from './usePokemonData';
import { usePokemonRound } from './usePokemonRound';
import { usePokemonCountdown } from './usePokemonCountdown';

export const usePokemonGame = () => {
  const { getPokemons } = usePokemonData();
  const {
    time,
    numberOfRounds,
    currentRound,
    startRound,
    gameStatus,
    finishRound,
    pokemonOptions,
  } = usePokemonRound();
  const { stopCountdown } = usePokemonCountdown();

  const pokemons = ref<Pokemon[]>([]);
  const score = ref<number>(0);

  const randomPokemon = computed(() => {
    if (pokemonOptions.value.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex];
  });

  const isLoading = computed(() => pokemons.value.length === 0);

  const checkAnswer = (id: number) => {
    if (gameStatus.value === GameStatus.Draw) return;

    const hasWon = randomPokemon.value?.id === id;

    if (hasWon) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });
      score.value++;
      finishRound(GameStatus.Won);
    } else {
      finishRound(GameStatus.Lost);
    }

    if (currentRound.value >= numberOfRounds) {
      finishRound(GameStatus.Finished);
    }
  };

  onMounted(async () => {
    pokemons.value = await getPokemons();
    startRound(pokemons.value, 4, () => {
      checkAnswer(randomPokemon.value?.id || 0);
    });
  });

  const nextAction = computed(() =>
    gameStatus.value === GameStatus.Finished
      ? () => resetGame()
      : () => startRound(pokemons.value, 4, () => checkAnswer(randomPokemon.value?.id || 0)),
  );

  const resetGame = async () => {
    stopCountdown();
    currentRound.value = 0;
    score.value = 0;
    gameStatus.value = GameStatus.Playing;

    pokemons.value = await getPokemons();
    startRound(pokemons.value, 4, () => {
      checkAnswer(randomPokemon.value?.id || 0);
    });
  };

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    checkAnswer,
    score,
    time,
    currentRound,
    resetGame,
    startRound,
    pokemons,
    nextAction,
    numberOfRounds,
  };
};
