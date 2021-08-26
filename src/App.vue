<template>
  <div id="main-page" class="flex flex-row flex-nowrap h-24 pt-4">
    <ToolBar />
    <MiddleContainer />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import MiddleContainer from './components/MiddleContainer.vue';
import * as cornerstone from 'cornerstone-core';
// import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import initCornerstone from './helpers/initCornerStone';

import { onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
  components: {
    ToolBar,
    MiddleContainer,
  },

  setup() {
    const store = useStore();

    window.api.receive('open-studyId-modal:reply', () => {
      store.dispatch('toggleStudyIdModal');
    });
    window.api.receive('close-studyId-modal:reply', () => {
      store.dispatch('toggleStudyIdModal');
    });
    initCornerstone();
    cornerstone.registerImageLoader(
      'wadouri',
      cornerstoneWADOImageLoader.loadImage
    );

    onMounted(() => {
      console.log('app mounted');
    });
  },
};
</script>

<style></style>
