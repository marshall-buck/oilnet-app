<template>
  <a id="save-csv">
    <button-base
      title="Toggle Histogram"
      @click="clicked"
      :mode="isHistogramActive ? '' : 'inactive'"
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
          d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        ></path>
      </svg> </button-base
  ></a>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const isHistogramActive = ref(true);
    window.api.send('toggle-chart:hist', {
      chart: 'hist',
      isVisible: isHistogramActive.value,
    });

    const clicked = () => {
      isHistogramActive.value = !isHistogramActive.value;
      window.api.send('toggle-chart:hist', {
        chart: 'hist',
        isVisible: isHistogramActive.value,
      });
    };

    return {
      clicked,
      isHistogramActive,
    };
  },
};
</script>
