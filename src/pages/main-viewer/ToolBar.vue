<template>
  <div
    id="toolbar"
    class="flex flex-col flex-nowrap items-center justify-start gap-2 px-4"
  >
    <ButtonFileOpen />
  </div>
</template>

<script>
import ButtonFileOpen from '../../components/Buttons/ButtonFileOpen.vue';
export default {
  components: {
    ButtonFileOpen,
  },
};
</script>

<style></style>
