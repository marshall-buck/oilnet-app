<template>
  <Counter />
</template>

<script>
import Counter from './Counter.vue';
import store from '@/store';
import { provide } from 'vue';
export default {
  components: { Counter },
  setup() {
    provide('store', store);
  },
};
</script>

<style></style>
