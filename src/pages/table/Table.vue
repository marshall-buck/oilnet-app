<template>
  <div class="bg-white p-1">
    <table class="table-auto">
      <caption class="text-2xl">
        Sample
      </caption>
      <thead class="border-b-2">
        <tr>
          <th>icon</th>
          <!-- <th>Sample</th> -->
          <th>Depth</th>
          <th>Area</th>
          <th>Count</th>
          <th>Mean</th>
          <th>Std Dev</th>
          <th>Min</th>
          <th>Max</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="red"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="delete-row path"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </td>
          <!-- <td>1234</td> -->
          <td>4000.22</td>
          <td>857</td>
          <td>22000</td>
          <td>1234</td>
          <td>100</td>
          <td>3000</td>
          <td>-988</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted } from 'vue';
export default {
  setup() {
    window.api.receive('from', (e, arg) => {
      alert(arg);
    });
    onMounted(() => {
      console.log('From Table');
    });
  },
};
</script>

<style scoped>
th,
td {
  padding: 0.75rem;
  font-size: 1rem;
  text-align: right;
}
</style>
