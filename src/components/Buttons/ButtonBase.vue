<template>
  <button class="icon-button" :class="mode">
    <slot />
  </button>
</template>
<script>
export default {
  props: ['mode'],
};
</script>
<style scoped>
.inactive {
  opacity: 0.5;
}
</style>
