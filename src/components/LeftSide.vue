<template>
  <div id="left" class="flex flex-col flex-nowrap justify-between">
    <div id="top-left" class="overlay text-white space-y-2">
      <OverlayItem title="Client:   " :data="client" />
      <OverlayItem title="Job:   " :data="job" />
      <OverlayItem title="Well: " :data="well" />
      <OverlayItem title="Sample No: " :data="sampleNo" />
      <OverlayItem title="Depth: " :data="depth" />
    </div>
    <div id="middle-left" class="overlay text-white space-y-2">
      <OverlayItem title="Area: " :data="area" />
      <OverlayItem title="StdDev: " :data="stdDev" />
      <OverlayItem title="Mean Hu: " :data="meanHu" />

      <br />

      <OverlayItem title="Min: " :data="min" />
      <OverlayItem title="Max: " :data="max" />
      <OverlayItem title="Count: " :data="count" />
    </div>
    <WindowingInputs />
  </div>
</template>

<script>
import OverlayItem from './OverlayItem.vue';
import WindowingInputs from './WindowingInputs.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  components: { OverlayItem, WindowingInputs },
  setup() {
    const store = useStore();
    return {
      client: computed(() => store.getters.client),
      well: computed(() => store.getters.well),
      sampleNo: computed(() => store.getters.sampleNo),
      depth: computed(() => store.getters.depth),
      job: computed(() => store.getters.job),
      min: computed(() => store.getters.min),
      max: computed(() => store.getters.max),
      area: computed(() => parseFloat(store.getters.area).toFixed(2)),
      stdDev: computed(() => parseFloat(store.getters.stdDev).toFixed(2)),
      count: computed(() => store.getters.count),
      meanHu: computed(() => parseFloat(store.getters.meanHu).toFixed(2)),
    };
  },
};
</script>

<style></style>
