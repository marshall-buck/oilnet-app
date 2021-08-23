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
    window.api.receive('open-studyId-modal-reply', (arg) => {
      store.dispatch('toggleStudyIdModal');
      // Should log True
      console.log(arg, store.getters.isStudyIdModal);
    });
    window.api.receive('close-studyId-modal-reply', (arg) => {
      store.dispatch('toggleStudyIdModal');
      // Should be false
      console.log(arg, store.getters.isStudyIdModal);
    });

    onMounted(() => {
      console.log('app mounted');
    });
  },
};
</script>

<style></style>
