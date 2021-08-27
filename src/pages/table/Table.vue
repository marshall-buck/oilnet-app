<template>
  <div class="bg-white p-1">
    <table class="table-auto">
      <caption class="text-2xl mb-2">
        Sample
        {{
          title
        }}
      </caption>
      <thead class="border-b-2 mb-2">
        <tr>
          <th></th>

          <th>Axial</th>
          <th>Area</th>
          <th>Count</th>
          <th>Mean</th>
          <th>Std Dev</th>
          <th>Min</th>
          <th>Max</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td @click="indexClicked(index)">
            <svg
              class="w-4 h-4 cursor-pointer"
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
          <td>{{ item.depth }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.mean }}</td>
          <td>{{ item.std }}</td>
          <td>{{ item.min }}</td>
          <td>{{ item.max }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
// TODO: Delete data rows
<script>
import { onMounted, ref } from 'vue';
export default {
  setup() {
    const data = ref(null);
    const title = ref('');

    onMounted(() => {
      window.api.receive('table-data:reply', (arg) => {
        data.value = JSON.parse(arg[0]);
        title.value = JSON.parse(arg[1]);
        console.log('image-data-changed', data.value);
      });
    });
    // Send index to delete
    const indexClicked = (index) => {
      window.api.send('delete-data-at', index);
    };
    return {
      data,
      indexClicked,
      title,
    };
  },
};
</script>

<style scoped>
th,
td,
tr {
  padding: 0 0.75rem;
  font-size: 1rem;
  text-align: center;
}
</style>
