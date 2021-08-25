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
      <OverlayItem title="Area: " :data="sampleNo" />
      <OverlayItem title="StdDev: " :data="sampleNo" />
      <OverlayItem title="Mean Hu: " :data="sampleNo" />

      <br />

      <OverlayItem title="Min: " :data="sampleNo" />
      <OverlayItem title="Max: " :data="sampleNo" />
      <OverlayItem title="Count: " :data="sampleNo" />
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
      // client: computed(() => store.getters.client),
      // client: computed(() => store.getters.client),
      // client: computed(() => store.getters.client),
    };
  },
};
</script>

<style></style>
