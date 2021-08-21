<template>
  <div id="right" class="flex flex-col flex-nowrap justify-between">
    <div id="top-right" class="text-white min-w-max space-y-2 text-left">
      <OverlayItem title="Study No: " data="" />
      <OverlayItem title="Image No: " data="" />
      <OverlayItem title="Axial Depth: " data="" />
    </div>
    <div id="br" class="overlay text-white text-right">
      <OverlayItem title="Zoom: " data="" />
    </div>
  </div>
</template>

<script>
import OverlayItem from './OverlayItem.vue';
export default {
  components: { OverlayItem },
};
</script>

<style></style>
