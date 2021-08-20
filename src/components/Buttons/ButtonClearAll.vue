<template>
  <button-base title="Clear All Circles" @click="clicked">
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
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </button-base>
</template>

<script>
export default {
  setup() {
    const clicked = () => console.log('Clear All');
    return {
      clicked,
    };
  },
};
</script>
