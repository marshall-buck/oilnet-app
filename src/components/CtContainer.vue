<template>
  <section
    id="ct-container"
    class="text-white flex flex-row flex-nowrap bg-black"
  >
    <LeftSide />
    <DicomContainer />

    <RightSide />
  </section>
  <WindowingSliders />
</template>

<script>
import LeftSide from './LeftSide.vue';
import WindowingSliders from './WindowingSliders.vue';
import DicomContainer from './DicomContainer.vue';
import RightSide from './RightSide.vue';
export default {
  components: { LeftSide, WindowingSliders, DicomContainer, RightSide },
};
</script>

<style></style>
