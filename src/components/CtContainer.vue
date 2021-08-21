<template>
  <section
    id="ct-container"
    class="text-white flex flex-row flex-nowrap bg-black"
  >
    <LeftSide />
    <div id="dicom-image" class="canvas-wh self-center"></div>
    <div id="right" class="flex flex-col flex-nowrap justify-between">
      <div id="top-right" class="text-white min-w-max space-y-2 text-left">
        <h3 id="study-number">Study No:</h3>
        <h3 id="image-number">Image No:</h3>
        <h3 id="axial-depth">Axial Depth</h3>
      </div>
      <div id="br" class="overlay text-white text-right">
        <h3 id="bottom-right">Zoom:</h3>
      </div>
    </div>
  </section>
</template>

<script>
import LeftSide from './LeftSide.vue';
export default {
  components: { LeftSide },
};
</script>

<style></style>
