<template>
  <button-base title="Record Data" @click.prevent="clicked">
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
        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
    const width = computed(() => store.getters.windowWidth);
    const center = computed(() => store.getters.windowCenter);
    const clicked = () => {
      if (width.value == center.value) {
        alert('Please adjust windowing before recording');
      } else {
        window.api.send('record-data-pressed', 'record button pressed');
      }
    };
    return {
      clicked,
    };
  },
};
</script>
