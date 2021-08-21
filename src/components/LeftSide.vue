<template>
  <div id="left" class="flex flex-col flex-nowrap justify-between flex-grow">
    <div id="top-left" class="overlay text-white space-y-2">
      <OverlayItem title="Client: " data="" />
      <OverlayItem title="Well: " data="" />
      <OverlayItem title="Sample No: " data="" />
      <OverlayItem title="Depth: " data="" />
    </div>
    <div id="middle-left" class="overlay text-white space-y-2">
      <OverlayItem title="Area: " data="" />
      <OverlayItem title="StdDev: " data="" />
      <OverlayItem title="Mean Hu: " data="" />

      <br />

      <OverlayItem title="Min: " data="" />
      <OverlayItem title="Max: " data="" />
      <OverlayItem title="Count: " data="" />
    </div>
    <div id="windowing-text-inputs" class="text-white">
      <div>
        <label class="mr-2"
          >Width:
          <input
            type="text"
            id="width-text"
            :value="width"
            @input="setWidth"
            class="bg-black"
        /></label>
      </div>
      <div>
        <label class="mr-2"
          >Center:
          <input
            type="text"
            id="center-text"
            :value="center"
            @input="setCenter"
            class="bg-black"
        /></label>
      </div>
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
    const width = computed(() => store.getters.defaultLevels.windowWidth);
    const center = computed(() => store.getters.defaultLevels.windowCenter);
    const setWidth = (e) => store.dispatch('setWidth', e.target.value);
    const setCenter = (e) => store.dispatch('setCenter', e.target.value);

    return {
      width,
      center,
      setWidth,
      setCenter,
    };
  },
};
</script>

<style></style>
