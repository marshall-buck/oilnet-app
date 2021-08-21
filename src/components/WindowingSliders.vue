<template>
  <div class="flex flex-row justify-start items-center pt-5">
    <div
      id="windowing-sliders"
      class="flex flex-col flex-nowrap self-start w-full"
    >
      <label class="text-white" for="width">Width</label>
      <input
        :value="width"
        @input="setWidth"
        class="w-2/5"
        type="range"
        min="-1000"
        max="4000"
      />
      <label class="text-white" for="level">Center</label>
      <input
        :value="center"
        @input="setCenter"
        class="w-2/5"
        type="range"
        min="0"
        max="4000"
      />
    </div>

    <div id="zoom" class="flex flex-row items-center justify-start gap-4">
      <ButtonZoomIn />
      <ButtonZoomOut />
      <ButtonZoomReset />
    </div>
  </div>
</template>

<script>
import ButtonZoomIn from '../components/Buttons/ButtonZoomIn.vue';
import ButtonZoomReset from '../components/Buttons/ButtonZoomReset.vue';
import ButtonZoomOut from '../components/Buttons/ButtonZoomOut.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  components: { ButtonZoomIn, ButtonZoomOut, ButtonZoomReset },

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
