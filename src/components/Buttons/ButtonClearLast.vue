<template>
  <button-base title="Clear Last Circle" @click="clicked">
    <svg
      fill="none"
      stroke="white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </button-base>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  setup() {
    const store = useStore();
    const isCircleToolActive = computed(() => store.getters.isCircleToolActive);
    const imageIds = computed(() => store.getters.imageIds);
    return {
      clicked: () => {
        if (imageIds.value.length === 0 || isCircleToolActive.value === false)
          return;
        store.dispatch('toggleClearLastCircle');
      },
    };
  },
};
</script>
