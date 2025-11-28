<template>
  <section
    class="w-full flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md rounded-b-lg text-sm sm:text-base md:text-lg font-semibold"
  >
    <div class="flex flex-col items-start">
      <span class="text-gray-500">Ronda</span>
      <span class="text-blue-600 text-xl">{{ currentRound }}/{{ numberOfRounds }}</span>
    </div>

    <div class="flex flex-col items-center">
      <span class="text-gray-500 flex items-center gap-1"> ⏳ Tiempo restante </span>
      <span
        :class="['text-xl font-bold', time <= 5 ? 'text-red-600 animate-pulse' : 'text-red-500']"
      >
        {{ time }}s
      </span>
      <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          class="bg-red-500 h-2 rounded-full transition-all duration-500"
          :style="{ width: `${(time / 5) * 100}%` }"
        ></div>
      </div>
    </div>

    <div class="flex flex-col items-end">
      <span class="text-gray-500">Puntaje</span>
      <span class="text-green-600 text-xl">{{ score }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  currentRound: number;
  numberOfRounds: number;
  time: number;
  score: number;
}

defineProps<Props>();
</script>
