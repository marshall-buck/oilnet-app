<template>
  <div ref="dicom" class="canvas-wh self-center"></div>
</template>

<script>
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
// import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

import { getSampleInfo } from '../helpers/helpers';

export default {
  setup() {
    const circleRoiTool = cornerstoneTools.CircleRoiTool;
    const StackScrollMouseWheelTool =
      cornerstoneTools.StackScrollMouseWheelTool;
    const dicom = ref(null);
    const store = useStore();
    const imageIds = computed(() => store.getters.imageIds);
    const defaultLevels = computed(() => store.getters.defaultLevels);
    const windowWidth = computed(() => store.getters.windowWidth);
    const windowCenter = computed(() => store.getters.windowCenter);
    const scale = computed(() => store.getters.scale);
    const stack = computed(() => store.getters.stack);
    const isCircleActive = computed(() => store.getters.isCircleToolActive);

    watch(imageIds, (newValue) => {
      if (newValue.length > 0) {
        cornerstone
          .loadImage(newValue[0])
          .then((image) => {
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
            const info = getSampleInfo(image);
            store.dispatch('sampleInfo', info);
            // setViewportInfo(image, viewportOptions);
            // TODO: Prevent StackScrollMouseWheel form begin added twice
            cornerstoneTools.addTool(StackScrollMouseWheelTool);
            cornerstoneTools.setToolActive('StackScrollMouseWheel', {});
          })
          .catch((e) => console.log(e));
      }
    });

    watch(windowWidth, () => {
      const viewport = cornerstone.getViewport(dicom.value);
      viewport.voi.windowWidth = defaultLevels.value.windowWidth;
      cornerstone.setViewport(dicom.value, viewport);
    });
    watch(windowCenter, () => {
      const viewport = cornerstone.getViewport(dicom.value);
      viewport.voi.windowCenter = defaultLevels.value.windowCenter;
      cornerstone.setViewport(dicom.value, viewport);
    });
    watch(isCircleActive, () => {
      if (isCircleActive.value) {
        cornerstoneTools.addTool(circleRoiTool);
        cornerstoneTools.setToolActive('CircleRoi', { mouseButtonMask: 1 });
      } else {
        cornerstoneTools.clearToolState(dicom.value, 'CircleRoi');
        cornerstone.updateImage(dicom.value);
      }
    });
    onMounted(() => {
      // console.log(defaultLevels, scale, StackScrollMouseWheelTool);

      cornerstone.enable(dicom.value);
    });

    return {
      dicom,
    };
  },
};
</script>

<style></style>
