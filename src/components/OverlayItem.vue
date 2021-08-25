<template>
  <div class="flex">
    <h3 class="overlay pr-2">{{ title }}</h3>
    <h3 class="overlay text-right">{{ data }}</h3>
  </div>
</template>

<script>
export default {
  props: ['title', 'data'],
};
</script>

<style></style>
