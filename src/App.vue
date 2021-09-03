<template>
  <div
    id="main-page"
    class="flex flex-row flex-nowrap pt-4 h-screen w-screen justify-around"
  >
    <ToolBar />
    <MiddleContainer />
    <div
      class="flex flex-col flex-nowrap items-center justify-start gap-2 px-4"
    >
      <ButtonToggleTable class="ml-2" />
      <ButtonToggleHist class="ml-2" />
      <ButtonToggleInt class="ml-2" />
    </div>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import MiddleContainer from './components/MiddleContainer.vue';
import * as cornerstone from 'cornerstone-core';
// import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import initCornerstone from './helpers/initCornerStone';
import ButtonToggleHist from './components/Buttons/ButtonToggleHist.vue';
import ButtonToggleInt from './components/Buttons/ButtonToggleInt.vue';
import ButtonToggleTable from './components/Buttons/ButtonToggleTable.vue';

import { onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
  components: {
    ToolBar,
    MiddleContainer,
    ButtonToggleHist,
    ButtonToggleInt,
    ButtonToggleTable,
  },

  setup() {
    const store = useStore();

    window.api.receive('open-studyNo-modal:reply', () => {
      store.dispatch('togglestudyNoModal');
    });
    window.api.receive('close-studyNo-modal:reply', () => {
      store.dispatch('togglestudyNoModal');
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
