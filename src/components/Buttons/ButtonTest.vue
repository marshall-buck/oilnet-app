<template>
  <button-base v-if="testMode" title="TEST" @click="clicked">
    TEST
  </button-base>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
export default {
  setup() {
    const store = useStore();
    const clicked = () => {
      console.log(cornerstone);
      console.log(cornerstoneTools);
      console.log(cornerstoneWADOImageLoader);
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
