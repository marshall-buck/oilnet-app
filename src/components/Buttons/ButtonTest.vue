<template>
  <button-base v-if="testMode" title="TEST" @click="clicked">
    TEST
  </button-base>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import * as cornerstoneTools from 'cornerstone-tools';
export default {
  setup() {
    const store = useStore();
    const liveData = computed(() => store.getters.liveData);
    const clicked = () => {
      // const def = { ...store.getters.defaultLevels, text: 'From Test Button' };
      // window.api.send('from-test-button', JSON.stringify(def));

      console.log(liveData.value);
    };

    const testMode = ref();
    onMounted(() => {
      if (process.env.NODE_ENV === 'development') {
        testMode.value = true;
      } else {
        testMode.value = false;
      }
      console.log(cornerstoneTools);
    });

    return {
      clicked,
      testMode,
    };
  },
};
</script>
