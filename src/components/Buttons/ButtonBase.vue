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
.active {
  opacity: 0.2;
}
</style>
