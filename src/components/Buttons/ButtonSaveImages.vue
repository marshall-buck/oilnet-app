<template>
  <button-base title="Save Images" @click="clicked">
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
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      ></path>
    </svg>
  </button-base>
</template>

<script>
// TODO:disable saving images if levels are equal of if no images loaded
// TODO: trigger saving of charts
import { useStore } from 'vuex';
import { computed } from 'vue';
import { convertRef } from '../../helpers/helpers';
export default {
  setup() {
    const store = useStore();
    const studyId = computed(() => store.getters.studyNo);
    const windowWidth = computed(() => store.getters.windowWidth);
    const windowCenter = computed(() => store.getters.windowCenter);
    const paths = computed(() => store.getters.paths);

    const clicked = () => {
      const data = {
        studyId: studyId.value,
        paths: convertRef(paths.value),
        width: windowWidth.value,
        center: windowCenter.value,
      };
      // if (data.width == data.center) alert('blah blah blah');
      window.api.send('save-jpeg-pressed', data);
    };
    return {
      clicked,
    };
  },
};
</script>
