<template>
  <button-base title="Download Studies" @click="clicked" :disabled="isActive">
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
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
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
    const clicked = () => {
      window.api.send('open-studyNo-modal', 'study modal Opened');
    };
    const isActive = computed(() => store.getters.isStudyNoModal);

    return {
      clicked,
      isActive,
    };
  },
};
</script>
