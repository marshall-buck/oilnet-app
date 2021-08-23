<template>
  <div class="bg-black flex items-center justify-center h-screen p-4">
    <input
      @keydown.enter="entered"
      @keydown.esc="clickClose"
      v-model="studyId"
      class="
        appearance-none
        rounded
        w-full
        px-3
        py-3
        pt-5
        pb-5
        focus focus:border-bg-blue-400 focus:outline-none
        active:outline-none active:border-bg-blue-400
        text-2xl
      "
      type="text"
      autofocus
      id="study-id"
      placeholder="Enter Study Number"
    />
    <svg
      @click="clickClose"
      id="close"
      class="w-12 h-12 -mt-20 -mx-1 cursor-pointer"
      fill="none"
      stroke="rgba(96, 165, 250"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const studyId = ref(null);
    const entered = () => window.api.send('study-id-entered', studyId);
    const clickClose = () => {
      window.api.send('close-studyId-modal', []);
    };
    return {
      clickClose,
      studyId,
      entered,
    };
  },
};
</script>

<style></style>
