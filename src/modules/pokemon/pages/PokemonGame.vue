<template>
  <section
    v-if="isLoading || randomPokemon?.id === null"
    class="flex flex-col justify-center items-center w-screen h-screen"
  >
    <h1 class="text-3xl">Espere por favor</h1>
    <h1 class="animate-pulse">Cargando Pokemons</h1>
  </section>

  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Quien es este pokemon?</h1>
    <!-- <h3 class="capitalize">{{ gameStatus }}</h3> -->

    <div class="h-20">
      <button
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextRound(4)"
        class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-alls"
        data-test-id="btn-new-game"
      >
        ¿Jugar de nuevo?
      </button>
    </div>

    <!-- <button @click="getNextRound()" :hidden="gameStatus === GameStatus.Playing">Nuevo juego</button> -->

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
  getNextRound,
  checkAnswer,
} = usePokemonGame();
</script>

<style scoped>
/* @reference "tailwindcss";
button {
  @apply bg-white shadow-md rounded-lg p-1 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
} */
</style>
