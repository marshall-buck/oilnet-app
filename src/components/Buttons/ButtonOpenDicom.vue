<template>
  <file-selector v-model="files" v-slot="{ openDialog }">
    <button-base title="Open Dicom Files" @click="openDialog">
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
  </file-selector>
</template>

<script>
// BUG: dialogue opens twice sometimes
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import FileSelector from '../FileSelector/FileSelector.vue';

export default {
  components: { FileSelector },
  setup() {
    const store = useStore();
    const files = ref([]);
    watch(files, () => {
      // store.dispatch('resetState');

      // // Tells backend to reset its currentData
      // window.api.send('reset-state');

      let ids = [];
      const filesArr = files.value;
      for (let i = 0; i < filesArr.length; i++) {
        ids.push(
          cornerstoneWADOImageLoader.wadouri.fileManager.add(filesArr[i])
        );
      }
      store.dispatch('loadStoreStackIds', ids);
      store.dispatch(
        'loadStoreStackPaths',
        Array.from(filesArr).map((e) => e.path)
      );
    });

    return {
      files,
    };
  },
};
</script>
