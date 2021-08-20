<template>
  <button-base title="TEST" @click="clicked"> TEST </button-base>
</template>

<script>
export default {
  setup() {
    const clicked = () => console.log('test');

    return {
      clicked,
    };
  },
};
</script>
