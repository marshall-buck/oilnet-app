<template>
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
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  setup() {
    const store = useStore();
    const width = computed(() => store.getters.defaultLevels.windowWidth);
    const center = computed(() => store.getters.defaultLevels.windowCenter);
    const setWidth = (e) =>
      store.dispatch('setWidth', parseInt(e.target.value));
    const setCenter = (e) =>
      store.dispatch('setCenter', parseInt(e.target.value));

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
