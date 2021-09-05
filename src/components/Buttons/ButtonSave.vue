<template>
  <button-base
    title="Save Images"
    @click="clicked"
    :mode="table.length === 0 ? 'inactive' : ''"
  >
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
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      ></path>
    </svg>
  </button-base>
</template>

<script>
// TODO: Wait for valid reply form api save before resetting state

import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const table = computed(() => store.getters.table);

    const clicked = () => {
      window.api.send('save-button-pressed');
    };
    return {
      clicked,
      table,
    };
  },
};
</script>
