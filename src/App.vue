<template>
  <div id="main-page" class="flex flex-row flex-nowrap h-24 pt-4">
    <ToolBar />
    <MiddleContainer />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import MiddleContainer from './components/MiddleContainer.vue';
import { onMounted } from 'vue';
export default {
  components: {
    ToolBar,
    MiddleContainer,
  },

  setup() {
    onMounted(() => console.log(process.env));
  },
};
</script>

<style></style>
