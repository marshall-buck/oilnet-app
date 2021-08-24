<template>
  <div ref="dicom" class="canvas-wh self-center"></div>
</template>

<script>
import * as cornerstone from 'cornerstone-core';
import { onMounted, ref } from '@vue/runtime-core';
import initCornerstone from '../helpers/initCornerStone';

export default {
  setup() {
    const dicom = ref(null);

    onMounted(() => {
      initCornerstone();
      cornerstone.enable(dicom.value);

      // cornerstone.registerImageLoader('wadouri', loadStack);
    });

    return {
      dicom,
    };
  },
};
</script>

<style></style>
