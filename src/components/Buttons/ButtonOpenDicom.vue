<template>
  <button-base title="Open Dicom Files" @click="clicked">
    <input ref="fPut" class="hidden" type="file" multiple="true" />
    <svg
      fill="none"
      stroke="white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
      />
    </svg>
  </button-base>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
export default {
  setup() {
    const store = useStore();
    const fPut = ref(null);
    const clicked = () => {
      fPut.value.onchange = () => {
        let files = fPut.value.files;
        let arr = [];
        for (let i = 0; i < files.length; i++) {
          arr.push(
            cornerstoneWADOImageLoader.wadouri.fileManager.add(files[i])
          );
        }
        store.dispatch('loadStoreStack', arr);

        // loadStack();
      };
      fPut.value.click();
      fPut.value.remove();
    };
    return {
      clicked,
      fPut,
    };
  },
};

// function openFiles() {
//   store.histogram = store.nullOutHistogram();
//   store.setImageData = [];
//   store.images = [];
//   deleteTable();
//   destroyAllCharts(['intensity-chart', 'hist-chart']);
//   cornerstone.imageCache.purgeCache();
//   store.setMeasurements = [store.labels];

//   store.stack.imageIds = [];
//   let input = document.createElement('input');
//   input.type = 'file';
//   input.multiple = true;
//   input.onchange = (_) => {
//     let files = input.files;

//     for (let i = 0; i < files.length; i++) {
//       store.stack.imageIds.push(
//         cornerstoneWADOImageLoader.wadouri.fileManager.add(files[i])
//       );
//     }

//     loadStack();
//   };
//   input.click();
//   input.remove();
// }
</script>
