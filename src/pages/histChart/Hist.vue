<template>
  <div class="bg-white">
    <h1>{{ title }}</h1>
    <p v-for="(item, index) in data" :key="index">{{ item.name }}</p>
    <p>{{ measurements }}</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
export default {
  setup() {
    const data = ref(null);
    const title = ref('');
    const measurements = ref(null);
    window.api.receive('hist-data:reply', (arg) => {
      data.value = JSON.parse(arg[2]);
      title.value = JSON.parse(arg[0]);
      measurements.value = JSON.parse(arg[1]);
    });
    onMounted(() => {
      console.log('From hist');
    });
    // Send index to delete

    return {
      data,
      measurements,
      title,
    };
  },
};
</script>

<style></style>
