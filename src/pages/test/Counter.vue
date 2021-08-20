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
      <button class="icon-button h-16 w-16" @click="increase">+</button>
      <p :style="{ color: activeColor }">{{ count }}</p>
      <button class="icon-button h-16 w-16" @click="decrease">-</button>
      <!-- <div>{{ store.getters.squared() }}</div> -->
    </div>
    <input v-model="changeTo" type="text" />
    <!-- <input v-model="store.state.color" type="text" /> -->
  </section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    const activeColor = computed(() => store.getters.color);

    const changeTo = computed({
      get() {
        return store.getters.color;
      },
      set(value) {
        store.dispatch('color', value);
      },
    });

    const count = computed(() => store.getters.count);

    const increase = () => store.dispatch('increase');
    const decrease = () => store.dispatch('decrease');

    return {
      count,
      increase,
      decrease,
      activeColor,
      changeTo,
    };
  },
};
</script>

<style></style>
