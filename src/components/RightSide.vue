<template>
  <div id="right" class="flex flex-col flex-nowrap justify-between">
    <div id="top-right" class="text-white min-w-max space-y-2 text-left">
      <OverlayItem title="Study No: " :data="studyNo" />
      <OverlayItem title="Image No: " :data="imageNo" />
      <OverlayItem title="Axial Depth: " :data="axialDepth" />
    </div>
    <div id="br" class="overlay text-white text-right">
      <OverlayItem title="Zoom: " :data="scale" />
    </div>
  </div>
</template>

<script>
import OverlayItem from './OverlayItem.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  components: { OverlayItem },
  setup() {
    const store = useStore();
    return {
      studyNo: computed(() => store.getters.studyNo),
      imageNo: computed(() => store.getters.imageNo),
      axialDepth: computed(() => {
        if (isNaN(store.getters.axialDepth)) return '';
        return Math.abs(parseFloat(store.getters.axialDepth).toFixed(2));
      }),
      scale: computed(() => store.getters.scale),
    };
  },
};
</script>

<style></style>
