<template>
  <button-base
    title="Toggle Intensity Charts"
    @click="clicked"
    :mode="isTableActive ? '' : 'inactive'"
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
        d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      ></path>
    </svg>
  </button-base>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const isTableActive = ref(true);
    window.api.send('toggle-chart:table', {
      chart: 'table',
      isVisible: isTableActive.value,
    });
    const clicked = () => {
      isTableActive.value = !isTableActive.value;
      window.api.send('toggle-chart:table', {
        chart: 'table',
        isVisible: isTableActive.value,
      });
    };
    return {
      clicked,
      isTableActive,
    };
  },
};
</script>
