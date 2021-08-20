<template>
  <section class="flex flex-col justify-center items-center h-screen w-screen">
    <div
      class="
        flex
        justify-center
        items-center
        w-96
        h-96
        bg-green-300
        text-2xl
        font-bold
        gap-10
      "
    >
      <button class="icon-button h-16 w-16" @click="store.methods.increase">
        +
      </button>
      <p :style="{ color: store.state.color }">{{ store.state.count }}</p>
      <button class="icon-button h-16 w-16" @click="store.methods.decrease">
        -
      </button>
      <div>{{ store.getters.squared() }}</div>
    </div>
    <input v-model="colorCode" type="text" />
    <!-- <input v-model="store.state.color" type="text" /> -->
  </section>
</template>

<script>
import { inject, computed } from 'vue';

export default {
  setup() {
    const store = inject('store');

    const colorCode = computed({
      get() {
        return store.state.color;
      },
      set(val) {
        store.methods.setColor(val);
      },
    });

    return {
      store,
      colorCode,
    };
  },
};
</script>

<style></style>
