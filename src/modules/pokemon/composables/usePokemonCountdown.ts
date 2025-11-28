import { computed, ref } from 'vue';

export const usePokemonCountdown = (initialTime: number = 5) => {
  const time = ref<number>(initialTime);
  let timer: number | undefined;
  const isTimeUp = computed(() => time.value <= 0);

  const startCountdown = (onFinish?: () => void) => {
    time.value = initialTime;
    timer = window.setInterval(() => {
      if (time.value > 0) {
        time.value--;
      } else {
        clearInterval(timer);
        if (onFinish) onFinish();
      }
    }, 1000);
  };

  const stopCountdown = () => {
    if (timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };

  return {
    time,
    isTimeUp,
    startCountdown,
    stopCountdown,
  };
};
