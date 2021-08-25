<template>
  <div ref="dicom" class="canvas-wh self-center"></div>
</template>

<script>
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
// import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { computed, onMounted, ref, watch } from 'vue';

import initCornerstone from '../helpers/initCornerStone';
import { useStore } from 'vuex';

export default {
  setup() {
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;
    const dicom = ref(null);
    const store = useStore();
    const imageIds = computed(() => store.getters.imageIds);
    const defaultLevels = computed(() => store.getters.defaultLevels);
    const scale = computed(() => store.getters.scale);
    const stack = computed(() => store.getters.stack);

    watch(imageIds, (newValue, oldValue) => {
      if (newValue.length > 0) {
        console.log(oldValue);
        cornerstone
          .loadImage(newValue[0])
          .then((image) => {
            console.log(image);
            const viewportOptions = {
              scale: scale.value,
              voi: defaultLevels.value,
              invert: false,
              pixelReplication: false,
            };
            cornerstone.displayImage(dicom.value, image, viewportOptions);
            cornerstoneTools.addStackStateManager(dicom.value, [
              'stack',
              'CircleRoi',
            ]);
            cornerstoneTools.addToolState(dicom.value, 'stack', stack.value);
            // windowing.setWindowInputValues();
            // windowing.setSliderInputValues();
            // setViewportInfo(image, viewportOptions);
            cornerstoneTools.addTool(StackScrollMouseWheelTool);
            cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
          })
          .catch((e) => console.log(e));
      }
    });

    onMounted(() => {
      // console.log(defaultLevels, scale, StackScrollMouseWheelTool);
      initCornerstone();
      cornerstone.enable(dicom.value);
    });

    return {
      dicom,
    };
  },
};
</script>

<style></style>
