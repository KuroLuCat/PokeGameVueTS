import { ref } from 'vue';
import { GameStatus, type Pokemon } from '../interfaces';
import { usePokemonCountdown } from './usePokemonCountdown';

export const usePokemonRound = () => {
  const { time, startCountdown, stopCountdown } = usePokemonCountdown();

  const numberOfRounds = 5;
  const currentRound = ref<number>(0);
  const gameStatus = ref<GameStatus>(GameStatus.Playing);

  const pokemonOptions = ref<Pokemon[]>([]);

  const startRound = (pokemons: Pokemon[], howMany: number, onTimeout: () => void) => {
    if (currentRound.value >= numberOfRounds) {
      gameStatus.value = GameStatus.Finished;
      return;
    }
    currentRound.value++;
    gameStatus.value = GameStatus.Playing;

    pokemonOptions.value = pokemons.slice(0, howMany);
    pokemons.splice(0, howMany);

    startCountdown(() => {
      gameStatus.value = GameStatus.Draw;
      onTimeout();
    });
  };

  const finishRound = (status: GameStatus) => {
    stopCountdown();
    gameStatus.value = status;
  };

  return {
    time,
    numberOfRounds,
    currentRound,
    gameStatus,
    startRound,
    finishRound,
    pokemonOptions,
  };
};
