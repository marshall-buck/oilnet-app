<template>
  <div ref="dicom" class="canvas-wh self-center"></div>
</template>

<script>
import * as cornerstone from 'cornerstone-core';
import { onMounted, ref } from '@vue/runtime-core';

export default {
  setup() {
    const dicom = ref(null);

    onMounted(() => {
      cornerstone.enable(dicom.value);
      console.log(cornerstone);
      console.log(dicom.value);
    });

    return {
      dicom,
    };
  },
};
</script>

<style></style>
