<template>
  <div id="main-page" class="flex flex-row flex-nowrap h-24 pt-4">
    <ToolBar />
    <!-- <a class="block icon-button" target="_blank" href="intChart.html">int</a>
    <a class="block icon-button" target="_blank" href="histChart.html">hist</a>
    <a class="block icon-button" target="_blank" href="table.html">table</a> -->
  </div>
</template>

<script>
import ToolBar from './ToolBar.vue';

export default {
  components: {
    ToolBar,
  },
};
</script>

<style></style>
