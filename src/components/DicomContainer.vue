<template>
  <div ref="dicom" class="canvas-wh self-center"></div>
</template>

<script>
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import omit from 'lodash.omit';
import ceil from 'lodash.ceil';
// import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

import { getSampleInfo, recordImagePixelDataToStore } from '../helpers/helpers';

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
    const isClearLastCircle = computed(() => store.getters.isClearLastCircle);
    const imagePixelData = computed(() => store.getters.imagePixelData);
    const measurementTable = computed(() => store.getters.measurementTable);
    const axialDepth = computed(() => store.getters.axialDepth);
    const getToolState = (tool) => {
      return cornerstoneTools.getToolState(dicom.value, tool);
    };

    function displayOverlayData() {
      const data = getToolState('CircleRoi').data[0].cachedStats;
      if (data) {
        store.dispatch('area', data.area);
        store.dispatch('min', data.min);
        store.dispatch('meanHu', data.mean);
        store.dispatch('stdDev', data.stdDev);
        store.dispatch('count', data.count);
        store.dispatch('max', data.max);
      }
    }

    function recordImageData() {
      const data = getToolState('CircleRoi');
      if (data.data.length === 0) return;
      const stats = data.data[0].cachedStats;
      const handles = data.data[0].handles;
      const newData = Object.values(omit(stats, ['meanStdDevSUV', 'variance']));
      const rounded = newData.map((e) => ceil(e, 2));
      const item = recordImagePixelDataToStore(dicom.value, handles);
      store.dispatch('addImagePixelData', item);
      const mes = [Math.abs(parseInt(axialDepth.value)), ...rounded];
      store.dispatch('addMeasurementTableData', mes);
      const sentData = {
        measurement: JSON.stringify(measurementTable.value),
        hist: JSON.stringify(imagePixelData.value),
      };

      window.api.send('data-sent', sentData);
    }

    onMounted(() => {
      cornerstone.enable(dicom.value);
      dicom.value.addEventListener(
        'cornerstonetoolsmeasurementmodified',
        () => {
          displayOverlayData();
        }
      );
      dicom.value.addEventListener(
        'cornerstonetoolsmeasurementcompleted',
        () => {
          displayOverlayData();
        }
      );
      dicom.value.addEventListener('cornerstonenewimage', (e) => {
        const info = getSampleInfo(e.detail.image);
        store.dispatch('sampleInfo', info);
        // console.log(e);
      });
      window.api.receive('record-data-pressed:reply', () => {
        recordImageData();
      });
    });

    watch(imagePixelData, () => {
      // send data object for measurement table
      // send data object for int chart
      // send data object for histogram chart
    });

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
            // const info = getSampleInfo(image);
            // store.dispatch('sampleInfo', info);
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
    // TODO: Figure out a way to hide cursor when circle tool is false
    watch(isCircleActive, () => {
      if (isCircleActive.value === true) {
        cornerstoneTools.addTool(circleRoiTool);
        cornerstoneTools.setToolActive('CircleRoi', { mouseButtonMask: 1 });
      } else {
        cornerstoneTools.clearToolState(dicom.value, 'CircleRoi');
        cornerstoneTools.setToolDisabled('CircleRoi', { mouseButtonMask: 1 });

        if (imageIds.value.length !== 0) cornerstone.updateImage(dicom.value);
      }
    });

    watch(isClearLastCircle, () => {
      if (isClearLastCircle.value === true) {
        const data = getToolState('CircleRoi');
        cornerstoneTools.removeToolState(
          dicom.value,
          'CircleRoi',
          data.data.pop()
        );
        cornerstone.updateImage(dicom.value);
        store.dispatch('toggleClearLastCircle');
      }
    });

    return {
      dicom,
    };
  },
};
</script>

<style></style>
