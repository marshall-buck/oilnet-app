<template>
  <button-base title="Next Image" @click="clicked">
    <svg
      fill="none"
      stroke="white"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button-base>
</template>

<script>
export default {
  setup() {
    const clicked = () => console.log('Next');
    return {
      clicked,
    };
  },
};
</script>
