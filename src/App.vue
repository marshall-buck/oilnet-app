<template>
  <div id="main-page" class="flex flex-row flex-nowrap h-24 pt-4">
    <ToolBar />
    <MiddleContainer />
    <StudyIdModal v-if="study" />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue';
import MiddleContainer from './components/MiddleContainer.vue';
import StudyIdModal from './components/StudyIdModal.vue';

import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  components: {
    ToolBar,
    MiddleContainer,
    StudyIdModal,
  },

  setup() {
    const store = useStore();
    onMounted(() => {
      localStorage.setItem('TestItem', 'From app.vue');
    });
    const study = computed(() => store.getters.isStudyIdModal);

    return {
      study,
    };
  },
};
</script>

<style></style>
