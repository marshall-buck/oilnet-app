<template>
  <button-base
    title="Toggle Intensity Charts"
    @click="clicked"
    :mode="isIntensityActive ? '' : 'inactive'"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      ></path>
    </svg>
  </button-base>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const isIntensityActive = ref(false);
    window.api.send('toggle-chart:int', {
      chart: 'int',
      isVisible: isIntensityActive.value,
    });
    const clicked = () => {
      isIntensityActive.value = !isIntensityActive.value;
      window.api.send('toggle-chart:int', {
        chart: 'int',
        isVisible: isIntensityActive.value,
      });
    };
    return {
      clicked,
      isIntensityActive,
    };
  },
};
</script>
