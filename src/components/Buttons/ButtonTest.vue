<template>
  <button-base v-if="testMode" title="TEST" @click="clicked">
    TEST
  </button-base>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
// import * as cornerstoneTools from 'cornerstone-tools';
export default {
  setup() {
    const store = useStore();
    const clicked = () => {
      console.log(store);
      window.api.send('from-test-button');
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
