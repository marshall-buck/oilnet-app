<template>
  <button-base title="Previous Image" @click="clicked">
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
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button-base>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const imageIds = computed(() => store.getters.imageIds);
    const currentImageIdIndex = computed(
      () => store.getters.currentImageIdIndex
    );

    const clicked = () => {
      if (currentImageIdIndex.value === 0 || imageIds.value.length === 0)
        return;

      const data = currentImageIdIndex.value - 1;
      store.dispatch('scrollToThisNumber', data);
    };
    return {
      clicked,
    };
  },
};
</script>
