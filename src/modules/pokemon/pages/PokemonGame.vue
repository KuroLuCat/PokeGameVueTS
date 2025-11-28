<template>
  <section
    v-if="isLoading || randomPokemon?.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h1 class="animate-pulse">Cargando Pokemons</h1>
  </section>

  <section class="absolute top-0 left-0 w-full flex justify-between items-center p-4">
    <h2 class="m-4">Ronda: {{ currentRound }}/5</h2>
    <h2 v-if="gameStatus === GameStatus.Playing" class="m-2">Tiempo restante: {{ time }}</h2>
    <h2 class="m-4">Puntaje: {{ score }}</h2>
  </section>

  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quién es este pokemon?</h1>
    <!-- <h3 class="capitalize">{{ gameStatus }}</h3> -->
    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="nextAction"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-alls"
        data-test-id="btn-new-game"
      >
        {{ gameStatus === GameStatus.Finished ? 'Nuevo juego' : 'Siguiente ronda' }}
      </button>
    </div>

    <!-- POkemon picture -->
    <PokemonPicture
      :pokemon-id="randomPokemon?.id ?? 0"
      :show-pokemon="gameStatus !== GameStatus.Playing"
    />
    <!-- POkemon options -->
    <PokemonOptions
      :options="options"
      :block-selection="gameStatus !== GameStatus.Playing"
      :correct-answer="randomPokemon?.id ?? 0"
      @selected-option="checkAnswer"
    />
  </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';
import { GameStatus } from '../interfaces';

const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonOptions: options,
  checkAnswer,
  score,
  time,
  currentRound,
  nextAction,
} = usePokemonGame();
</script>

<style scoped></style>
