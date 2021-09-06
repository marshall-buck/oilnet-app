<template>
  <button-base v-if="testMode" title="TEST" @click="clicked">
    TEST
  </button-base>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const clicked = () => {
      window.api.send('test-but-pressed');
    };

    const testMode = ref();
    onMounted(() => {
      if (process.env.NODE_ENV === 'development') {
        testMode.value = true;
      } else {
        testMode.value = false;
      }
    });

    return {
      clicked,
      testMode,
    };
  },
};
</script>
