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
import { useStore } from 'vuex';
export default {
  components: {
    ToolBar,
    MiddleContainer,
  },

  setup() {
    const store = useStore();
    // window.api.receive('from-main', (e, arg) => {
    //   console.log(e, arg);
    // });
    onMounted(() => {
      console.log(store);
    });
  },
};
</script>

<style></style>
