<template>
  <button-base v-if="testMode" title="TEST" @click="clicked">
    TEST
  </button-base>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    const clicked = () => {
      const def = { ...store.getters.defaultLevels, text: 'From Test Button' };
      window.api.send('from-test-button', JSON.stringify(def));
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
